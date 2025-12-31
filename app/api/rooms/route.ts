import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleApiError, successResponse } from '@/lib/api-helpers';
import { RoomWithAvailability } from '@/lib/types';

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
      const roomsWithAvailability: RoomWithAvailability[] = rooms.map((room) => {
        const bookedCount =
          overlappingBookings.find((b) => b.roomId === room.id)?._count.roomId || 0;
        const totalRooms = room.inventory[0]?.totalRooms || 0;
        const availableRooms = Math.max(0, totalRooms - bookedCount);

        return {
          ...room,
          inventory: room.inventory.map(inv => ({
            ...inv,
            availableRooms,
          })),
          available: availableRooms,
          isAvailable: availableRooms > 0,
        };
      });

      return successResponse(roomsWithAvailability);
    }

    // Calculate current availability (rooms occupied TODAY)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get count of bookings that are currently occupying rooms TODAY
    // (where today falls between checkIn and checkOut)
    const activeBookings = await prisma.booking.groupBy({
      by: ['roomId'],
      where: {
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
        checkIn: {
          lte: today,
        },
        checkOut: {
          gt: today,
        },
      },
      _count: {
        roomId: true,
      },
    });

    // Add current availability info to rooms
    const roomsWithCurrentAvailability: RoomWithAvailability[] = rooms.map((room) => {
      const bookedCount =
        activeBookings.find((b) => b.roomId === room.id)?._count.roomId || 0;
      const totalRooms = room.inventory[0]?.totalRooms || 0;
      const availableRooms = Math.max(0, totalRooms - bookedCount);

      return {
        ...room,
        inventory: room.inventory.map(inv => ({
          ...inv,
          availableRooms,
        })),
        available: availableRooms,
        isAvailable: availableRooms > 0,
      };
    });

    return successResponse(roomsWithCurrentAvailability);
  } catch (error) {
    return handleApiError(error);
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
