import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/rooms - Get all rooms with availability
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const guests = searchParams.get('guests');

    const rooms = await prisma.room.findMany({
      include: {
        amenities: {
          include: {
            amenity: true,
          },
        },
        inventory: true,
      },
    });

    // If dates provided, check availability
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      // Get bookings that overlap with requested dates
      const overlappingBookings = await prisma.booking.groupBy({
        by: ['roomId'],
        where: {
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
        _count: {
          roomId: true,
        },
      });

      // Add availability info to rooms
      const roomsWithAvailability = rooms.map((room) => {
        const bookedCount =
          overlappingBookings.find((b) => b.roomId === room.id)?._count.roomId || 0;
        const totalRooms = room.inventory[0]?.totalRooms || 0;
        const available = totalRooms - bookedCount;

        return {
          ...room,
          available,
          isAvailable: available > 0,
        };
      });

      return NextResponse.json(roomsWithAvailability);
    }

    return NextResponse.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}

// POST /api/rooms - Create a new room (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      description,
      basePrice,
      maxGuests,
      size,
      bedType,
      imageUrl,
      images,
      amenityIds,
      totalRooms,
    } = body;

    const room = await prisma.room.create({
      data: {
        name,
        slug,
        description,
        basePrice,
        maxGuests,
        size,
        bedType,
        imageUrl,
        images,
        amenities: {
          create: amenityIds?.map((amenityId: string) => ({
            amenityId,
          })),
        },
        inventory: {
          create: {
            totalRooms: totalRooms || 10,
          },
        },
      },
      include: {
        amenities: {
          include: {
            amenity: true,
          },
        },
        inventory: true,
      },
    });

    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.error('Error creating room:', error);
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
  }
}
