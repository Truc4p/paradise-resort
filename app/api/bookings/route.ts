import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/bookings - Get all bookings (with optional user filter)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const where = userId ? { userId } : {};

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        room: true,
        payment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      roomId,
      checkIn,
      checkOut,
      numberOfGuests,
      specialRequests,
      paymentMethod,
    } = body;

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    if (checkInDate >= checkOutDate) {
      return NextResponse.json(
        { error: 'Check-out date must be after check-in date' },
        { status: 400 }
      );
    }

    // Check room availability
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        inventory: true,
      },
    });

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    // Count overlapping bookings
    const overlappingBookings = await prisma.booking.count({
      where: {
        roomId,
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
        OR: [
          {
            checkIn: {
              lte: checkOutDate,
            },
            checkOut: {
              gte: checkInDate,
            },
          },
        ],
      },
    });

    const totalRooms = room.inventory[0]?.totalRooms || 0;
    const available = totalRooms - overlappingBookings;

    if (available <= 0) {
      return NextResponse.json(
        { error: 'Room not available for selected dates' },
        { status: 400 }
      );
    }

    // Calculate total price
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = Number(room.basePrice) * nights;

    // Use transaction to ensure atomicity
    const booking = await prisma.$transaction(async (tx) => {
      // Double-check availability within transaction
      const currentBookings = await tx.booking.count({
        where: {
          roomId,
          status: {
            in: ['PENDING', 'CONFIRMED'],
          },
          OR: [
            {
              checkIn: {
                lte: checkOutDate,
              },
              checkOut: {
                gte: checkInDate,
              },
            },
          ],
        },
      });

      if (currentBookings >= totalRooms) {
        throw new Error('Room no longer available');
      }

      // Create booking with payment atomically
      return await tx.booking.create({
        data: {
          userId,
          roomId,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          numberOfGuests,
          totalPrice,
          specialRequests,
          status: 'PENDING',
          payment: {
            create: {
              amount: totalPrice,
              paymentMethod: paymentMethod || 'CREDIT_CARD',
              paymentStatus: 'PENDING',
            },
          },
        },
        include: {
          room: true,
          payment: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    });

    return NextResponse.json(
      {
        message: 'Booking created successfully',
        data: booking,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating booking:', error);
    
    if (error.message === 'Room no longer available') {
      return NextResponse.json(
        { error: 'Room is no longer available for selected dates' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
