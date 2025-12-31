import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // days
    const days = parseInt(period);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Fetch all bookings for the period
    const bookings = await prisma.booking.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      include: {
        room: true,
        payment: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Fetch all bookings for occupancy calculation
    const allBookings = await prisma.booking.findMany({
      where: {
        status: {
          in: ['CONFIRMED', 'PENDING'],
        },
      },
      include: {
        room: true,
      },
    });

    // Fetch total rooms inventory
    const roomInventory = await prisma.roomInventory.findMany({
      include: {
        room: true,
      },
    });

    // Calculate total available rooms
    const totalRooms = roomInventory.reduce((sum, inv) => sum + inv.totalRooms, 0);

    // Revenue by day
    const revenueByDay = bookings.reduce((acc: any, booking) => {
      const date = booking.createdAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += Number(booking.totalPrice);
      return acc;
    }, {});

    const revenueChartData = Object.entries(revenueByDay)
      .map(([date, revenue]) => ({
        date,
        revenue: Number(revenue),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Bookings by day
    const bookingsByDay = bookings.reduce((acc: any, booking) => {
      const date = booking.createdAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += 1;
      return acc;
    }, {});

    const bookingsChartData = Object.entries(bookingsByDay)
      .map(([date, count]) => ({
        date,
        bookings: count,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Revenue by week
    const revenueByWeek = bookings.reduce((acc: any, booking) => {
      const date = new Date(booking.createdAt);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekKey = weekStart.toISOString().split('T')[0];
      
      if (!acc[weekKey]) {
        acc[weekKey] = 0;
      }
      acc[weekKey] += Number(booking.totalPrice);
      return acc;
    }, {});

    const weeklyRevenueData = Object.entries(revenueByWeek)
      .map(([week, revenue]) => ({
        week,
        revenue: Number(revenue),
      }))
      .sort((a, b) => new Date(a.week).getTime() - new Date(b.week).getTime());

    // Revenue by month
    const revenueByMonth = bookings.reduce((acc: any, booking) => {
      const date = booking.createdAt;
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!acc[monthKey]) {
        acc[monthKey] = 0;
      }
      acc[monthKey] += Number(booking.totalPrice);
      return acc;
    }, {});

    const monthlyRevenueData = Object.entries(revenueByMonth)
      .map(([month, revenue]) => ({
        month,
        revenue: Number(revenue),
      }))
      .sort((a, b) => a.month.localeCompare(b.month));

    // Popular room types
    const roomTypeBookings = bookings.reduce((acc: any, booking) => {
      const roomName = booking.room.name;
      if (!acc[roomName]) {
        acc[roomName] = {
          count: 0,
          revenue: 0,
        };
      }
      acc[roomName].count += 1;
      acc[roomName].revenue += Number(booking.totalPrice);
      return acc;
    }, {});

    const popularRooms = Object.entries(roomTypeBookings)
      .map(([name, data]: [string, any]) => ({
        name,
        bookings: data.count,
        revenue: data.revenue,
      }))
      .sort((a, b) => b.bookings - a.bookings);

    // Occupancy calculation
    // Calculate occupied room-nights
    const occupiedNights = allBookings.reduce((total, booking) => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      return total + nights;
    }, 0);

    // Calculate total available room-nights for the period
    const totalAvailableNights = totalRooms * days;
    const occupancyRate = totalAvailableNights > 0 
      ? ((occupiedNights / totalAvailableNights) * 100).toFixed(2)
      : 0;

    // Peak booking periods (heatmap data)
    const bookingHeatmap = bookings.reduce((acc: any, booking) => {
      const date = new Date(booking.createdAt);
      const dayOfWeek = date.getDay(); // 0 = Sunday
      const hour = date.getHours();
      
      const key = `${dayOfWeek}-${hour}`;
      if (!acc[key]) {
        acc[key] = {
          day: dayOfWeek,
          hour,
          count: 0,
        };
      }
      acc[key].count += 1;
      return acc;
    }, {});

    const heatmapData = Object.values(bookingHeatmap).map((item: any) => ({
      day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][item.day],
      hour: item.hour,
      count: item.count,
    }));

    // Metrics
    const totalRevenue = bookings.reduce((sum, b) => sum + Number(b.totalPrice), 0);
    const averageBookingValue = bookings.length > 0 ? totalRevenue / bookings.length : 0;
    const totalBookings = bookings.length;

    // Status breakdown
    const statusBreakdown = bookings.reduce((acc: any, booking) => {
      const status = booking.status;
      if (!acc[status]) {
        acc[status] = 0;
      }
      acc[status] += 1;
      return acc;
    }, {});

    const statusData = Object.entries(statusBreakdown).map(([status, count]) => ({
      status,
      count,
    }));

    return NextResponse.json({
      success: true,
      data: {
        metrics: {
          totalRevenue: Number(totalRevenue.toFixed(2)),
          averageBookingValue: Number(averageBookingValue.toFixed(2)),
          totalBookings,
          occupancyRate: Number(occupancyRate),
          totalRooms,
        },
        charts: {
          dailyRevenue: revenueChartData,
          dailyBookings: bookingsChartData,
          weeklyRevenue: weeklyRevenueData,
          monthlyRevenue: monthlyRevenueData,
          popularRooms,
          statusBreakdown: statusData,
          heatmap: heatmapData,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
