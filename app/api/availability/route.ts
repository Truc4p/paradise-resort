import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/availability - Check room availability for date range
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const roomId = searchParams.get('roomId');

    if (!checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'Check-in and check-out dates are required' },
        { status: 400 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Build where clause
    const where: any = {
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
    };

    if (roomId) {
      where.roomId = roomId;
    }

    // Get overlapping bookings grouped by room
    const overlappingBookings = await prisma.booking.groupBy({
      by: ['roomId'],
      where,
      _count: {
        roomId: true,
      },
    });

    // Get all rooms with inventory
    const rooms = await prisma.room.findMany({
      where: roomId ? { id: roomId } : {},
      include: {
        inventory: true,
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
    });

    // Calculate availability for each room
    const availability = rooms.map((room) => {
      const bookedCount =
        overlappingBookings.find((b) => b.roomId === room.id)?._count.roomId || 0;
      const totalRooms = room.inventory[0]?.totalRooms || 0;
      const available = totalRooms - bookedCount;

      return {
        roomId: room.id,
        roomName: room.name,
        totalRooms,
        bookedRooms: bookedCount,
        availableRooms: available,
        isAvailable: available > 0,
        basePrice: room.basePrice,
      };
    });

    return NextResponse.json(availability);
  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    );
  }
}
