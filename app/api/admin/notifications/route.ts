import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get today's check-ins
    const todayCheckIns = await prisma.booking.findMany({
      where: {
        checkIn: {
          gte: today,
          lt: tomorrow,
        },
        status: {
          in: ['CONFIRMED', 'PENDING'],
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        room: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        checkIn: 'asc',
      },
    });

    // Get today's check-outs
    const todayCheckOuts = await prisma.booking.findMany({
      where: {
        checkOut: {
          gte: today,
          lt: tomorrow,
        },
        status: {
          in: ['CONFIRMED', 'COMPLETED'],
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        room: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        checkOut: 'asc',
      },
    });

    // Get recent bookings (last 24 hours)
    const last24Hours = new Date();
    last24Hours.setHours(last24Hours.getHours() - 24);
    
    const recentBookings = await prisma.booking.findMany({
      where: {
        createdAt: {
          gte: last24Hours,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        room: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    // Get pending bookings
    const pendingBookings = await prisma.booking.findMany({
      where: {
        status: 'PENDING',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        room: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Get low inventory warnings
    const roomInventory = await prisma.roomInventory.findMany({
      include: {
        room: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Calculate current bookings per room
    const activeBookings = await prisma.booking.findMany({
      where: {
        status: {
          in: ['CONFIRMED', 'PENDING'],
        },
        checkIn: {
          lte: tomorrow,
        },
        checkOut: {
          gte: today,
        },
      },
      select: {
        roomId: true,
      },
    });

    const bookedRoomCounts = activeBookings.reduce((acc: any, booking) => {
      acc[booking.roomId] = (acc[booking.roomId] || 0) + 1;
      return acc;
    }, {});

    const lowInventory = roomInventory
      .map((inv) => {
        const bookedCount = bookedRoomCounts[inv.roomId] || 0;
        const available = inv.totalRooms - bookedCount;
        const percentage = (available / inv.totalRooms) * 100;
        
        return {
          roomId: inv.roomId,
          roomName: inv.room.name,
          totalRooms: inv.totalRooms,
          availableRooms: available,
          bookedRooms: bookedCount,
          availabilityPercentage: Math.round(percentage),
          isLow: percentage <= 30,
        };
      })
      .filter((item) => item.isLow);

    // Get unread contact messages
    const unreadMessages = await prisma.contactMessage.findMany({
      where: {
        isRead: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    // Get pending payments
    const pendingPayments = await prisma.payment.findMany({
      where: {
        paymentStatus: 'PENDING',
      },
      include: {
        booking: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            room: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // System health metrics
    const totalRooms = roomInventory.reduce((sum, inv) => sum + inv.totalRooms, 0);
    const totalBooked = Object.values(bookedRoomCounts).reduce(
      (sum: number, count: any) => sum + count,
      0
    ) as number;
    const occupancyRate = totalRooms > 0 ? ((totalBooked / totalRooms) * 100).toFixed(1) : '0';

    const totalBookings = await prisma.booking.count();
    const totalUsers = await prisma.user.count();
    const totalRevenue = await prisma.payment.aggregate({
      where: {
        paymentStatus: 'COMPLETED',
      },
      _sum: {
        amount: true,
      },
    });

    const systemHealth = {
      occupancyRate: Number(occupancyRate),
      totalRooms,
      availableRooms: totalRooms - totalBooked,
      totalBookings,
      totalUsers,
      totalRevenue: Number(totalRevenue._sum.amount || 0),
      pendingBookingsCount: pendingBookings.length,
      pendingPaymentsCount: pendingPayments.length,
      unreadMessagesCount: unreadMessages.length,
      lowInventoryCount: lowInventory.length,
    };

    // Create notification/alert items
    const alerts = [];

    // Pending bookings alert
    if (pendingBookings.length > 0) {
      alerts.push({
        id: 'pending-bookings',
        type: 'warning',
        title: 'Pending Bookings',
        message: `${pendingBookings.length} booking${pendingBookings.length > 1 ? 's' : ''} awaiting confirmation`,
        count: pendingBookings.length,
        priority: 'high',
        link: '/admin/bookings',
      });
    }

    // Low inventory alert
    if (lowInventory.length > 0) {
      alerts.push({
        id: 'low-inventory',
        type: 'warning',
        title: 'Low Room Availability',
        message: `${lowInventory.length} room type${lowInventory.length > 1 ? 's' : ''} running low`,
        count: lowInventory.length,
        priority: 'medium',
        link: '/admin/rooms',
      });
    }

    // Today's check-ins alert
    if (todayCheckIns.length > 0) {
      alerts.push({
        id: 'today-checkins',
        type: 'info',
        title: "Today's Check-ins",
        message: `${todayCheckIns.length} guest${todayCheckIns.length > 1 ? 's' : ''} checking in today`,
        count: todayCheckIns.length,
        priority: 'medium',
      });
    }

    // Today's check-outs alert
    if (todayCheckOuts.length > 0) {
      alerts.push({
        id: 'today-checkouts',
        type: 'info',
        title: "Today's Check-outs",
        message: `${todayCheckOuts.length} guest${todayCheckOuts.length > 1 ? 's' : ''} checking out today`,
        count: todayCheckOuts.length,
        priority: 'medium',
      });
    }

    // Unread messages alert
    if (unreadMessages.length > 0) {
      alerts.push({
        id: 'unread-messages',
        type: 'info',
        title: 'Unread Messages',
        message: `${unreadMessages.length} new customer inquir${unreadMessages.length > 1 ? 'ies' : 'y'}`,
        count: unreadMessages.length,
        priority: 'medium',
      });
    }

    // Pending payments alert
    if (pendingPayments.length > 0) {
      const pendingAmount = pendingPayments.reduce(
        (sum, payment) => sum + Number(payment.amount),
        0
      );
      alerts.push({
        id: 'pending-payments',
        type: 'warning',
        title: 'Pending Payments',
        message: `${pendingPayments.length} payment${pendingPayments.length > 1 ? 's' : ''} pending ($${pendingAmount.toFixed(2)})`,
        count: pendingPayments.length,
        priority: 'high',
        link: '/admin/finance',
      });
    }

    // Recent bookings notification
    if (recentBookings.length > 0) {
      alerts.push({
        id: 'recent-bookings',
        type: 'success',
        title: 'Recent Bookings',
        message: `${recentBookings.length} new booking${recentBookings.length > 1 ? 's' : ''} in the last 24 hours`,
        count: recentBookings.length,
        priority: 'low',
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        alerts,
        todayCheckIns,
        todayCheckOuts,
        recentBookings,
        pendingBookings,
        lowInventory,
        unreadMessages,
        pendingPayments,
        systemHealth,
      },
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
