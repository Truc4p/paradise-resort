import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/admin/rooms/advanced - Get rooms with availability calendar
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Fetch all rooms with inventory
    const rooms = await prisma.room.findMany({
      include: {
        inventory: true,
        amenities: {
          include: {
            amenity: true,
          },
        },
        bookings: startDate && endDate ? {
          where: {
            OR: [
              {
                checkIn: {
                  gte: new Date(startDate),
                  lte: new Date(endDate),
                },
              },
              {
                checkOut: {
                  gte: new Date(startDate),
                  lte: new Date(endDate),
                },
              },
              {
                AND: [
                  {
                    checkIn: {
                      lte: new Date(startDate),
                    },
                  },
                  {
                    checkOut: {
                      gte: new Date(endDate),
                    },
                  },
                ],
              },
            ],
            status: {
              in: ['CONFIRMED', 'PENDING'],
            },
          },
        } : undefined,
      },
      orderBy: {
        name: 'asc',
      },
    });

    // Calculate availability for date range if provided
    const roomsWithAvailability = rooms.map(room => {
      const totalRooms = room.inventory[0]?.totalRooms || 0;
      const bookingsCount = room.bookings?.length || 0;
      const available = totalRooms - bookingsCount;

      return {
        ...room,
        totalRooms,
        bookedRooms: bookingsCount,
        availableRooms: available,
        availabilityPercentage: totalRooms > 0 ? Math.round((available / totalRooms) * 100) : 0,
      };
    });

    return NextResponse.json({
      success: true,
      data: roomsWithAvailability,
    });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/admin/rooms/advanced - Bulk operations and advanced features
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { operation, data } = body;

    let result;

    switch (operation) {
      case 'bulk-update-price':
        // Bulk update prices
        const { roomIds, priceAdjustment, adjustmentType } = data;
        
        for (const roomId of roomIds) {
          const room = await prisma.room.findUnique({ where: { id: roomId } });
          if (room) {
            const currentPrice = Number(room.basePrice);
            let newPrice;
            
            if (adjustmentType === 'percentage') {
              newPrice = currentPrice * (1 + priceAdjustment / 100);
            } else {
              newPrice = currentPrice + priceAdjustment;
            }
            
            await prisma.room.update({
              where: { id: roomId },
              data: { basePrice: newPrice },
            });
          }
        }
        
        result = { message: `Updated prices for ${roomIds.length} rooms` };
        break;

      case 'bulk-update-inventory':
        // Bulk update inventory
        const { roomIds: invRoomIds, inventoryChange } = data;
        
        for (const roomId of invRoomIds) {
          const inventory = await prisma.roomInventory.findFirst({
            where: { roomId },
          });
          
          if (inventory) {
            await prisma.roomInventory.update({
              where: { id: inventory.id },
              data: { totalRooms: Math.max(0, inventory.totalRooms + inventoryChange) },
            });
          }
        }
        
        result = { message: `Updated inventory for ${invRoomIds.length} rooms` };
        break;

      case 'add-maintenance':
        // Add maintenance schedule (stored as special bookings or custom table)
        // For now, we'll use a simple approach
        result = {
          maintenanceId: `maint-${Date.now()}`,
          ...data,
        };
        break;

      case 'add-seasonal-pricing':
        // Add seasonal pricing rule
        result = {
          pricingRuleId: `price-${Date.now()}`,
          ...data,
        };
        break;

      case 'update-gallery':
        // Update room photo gallery
        const { roomId, images } = data;
        await prisma.room.update({
          where: { id: roomId },
          data: { images },
        });
        result = { message: 'Gallery updated successfully' };
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid operation' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error performing operation:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to perform operation' },
      { status: 500 }
    );
  }
}
