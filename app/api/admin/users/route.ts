import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/admin/users - Get all users with booking history (Admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (role && (role === 'GUEST' || role === 'ADMIN')) {
      where.role = role;
    }

    // Fetch users with booking information
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        bookings: {
          select: {
            id: true,
            status: true,
            checkIn: true,
            checkOut: true,
            totalPrice: true,
            numberOfGuests: true,
            createdAt: true,
            room: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              },
            },
            payment: {
              select: {
                id: true,
                amount: true,
                paymentStatus: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            bookings: true,
            reviews: true,
          },
        },
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    // Calculate additional statistics for each user
    const usersWithStats = users.map(user => {
      const totalSpent = user.bookings.reduce(
        (sum, booking) => sum + Number(booking.totalPrice),
        0
      );
      const confirmedBookings = user.bookings.filter(
        b => b.status === 'CONFIRMED'
      ).length;
      const pendingBookings = user.bookings.filter(
        b => b.status === 'PENDING'
      ).length;
      const cancelledBookings = user.bookings.filter(
        b => b.status === 'CANCELLED'
      ).length;
      
      return {
        ...user,
        stats: {
          totalBookings: user.bookings.length,
          confirmedBookings,
          pendingBookings,
          cancelledBookings,
          totalSpent,
          totalReviews: user._count.reviews,
        },
      };
    });

    return NextResponse.json({
      success: true,
      data: usersWithStats,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/users - Update user role (Admin only)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { userId, role } = body;

    if (!userId || !role || !['GUEST', 'ADMIN'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    // Prevent admin from demoting themselves
    if (userId === (session.user as any).id && role === 'GUEST') {
      return NextResponse.json(
        { error: 'You cannot demote yourself' },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: `User role updated to ${role}`,
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { error: 'Failed to update user role' },
      { status: 500 }
    );
  }
}
