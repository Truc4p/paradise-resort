import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/admin/finance - Get financial data and payment tracking
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const paymentStatus = searchParams.get('paymentStatus') || '';

    // Build date filter
    const dateFilter: any = {};
    if (startDate) {
      dateFilter.gte = new Date(startDate);
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      dateFilter.lte = end;
    }

    // Build where clause for payments
    const paymentWhere: any = {};
    if (Object.keys(dateFilter).length > 0) {
      paymentWhere.createdAt = dateFilter;
    }
    if (paymentStatus && ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'].includes(paymentStatus)) {
      paymentWhere.paymentStatus = paymentStatus;
    }

    // Fetch all payments with booking details
    const payments = await prisma.payment.findMany({
      where: paymentWhere,
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

    // Calculate summary metrics
    const totalRevenue = payments
      .filter(p => p.paymentStatus === 'COMPLETED')
      .reduce((sum, p) => sum + Number(p.amount), 0);

    const pendingAmount = payments
      .filter(p => p.paymentStatus === 'PENDING')
      .reduce((sum, p) => sum + Number(p.amount), 0);

    const refundedAmount = payments
      .filter(p => p.paymentStatus === 'REFUNDED')
      .reduce((sum, p) => sum + Number(p.amount), 0);

    const failedAmount = payments
      .filter(p => p.paymentStatus === 'FAILED')
      .reduce((sum, p) => sum + Number(p.amount), 0);

    // Count by status
    const completedCount = payments.filter(p => p.paymentStatus === 'COMPLETED').length;
    const pendingCount = payments.filter(p => p.paymentStatus === 'PENDING').length;
    const failedCount = payments.filter(p => p.paymentStatus === 'FAILED').length;
    const refundedCount = payments.filter(p => p.paymentStatus === 'REFUNDED').length;

    // Revenue by date
    const revenueByDate = payments
      .filter(p => p.paymentStatus === 'COMPLETED')
      .reduce((acc: any, payment) => {
        const date = payment.paidAt?.toISOString().split('T')[0] || payment.createdAt.toISOString().split('T')[0];
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += Number(payment.amount);
        return acc;
      }, {});

    const revenueChartData = Object.entries(revenueByDate)
      .map(([date, amount]) => ({
        date,
        amount: Number(amount),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Revenue by payment method
    const revenueByMethod = payments
      .filter(p => p.paymentStatus === 'COMPLETED')
      .reduce((acc: any, payment) => {
        const method = payment.paymentMethod;
        if (!acc[method]) {
          acc[method] = {
            count: 0,
            amount: 0,
          };
        }
        acc[method].count += 1;
        acc[method].amount += Number(payment.amount);
        return acc;
      }, {});

    const paymentMethodData = Object.entries(revenueByMethod).map(([method, data]: [string, any]) => ({
      method,
      count: data.count,
      amount: data.amount,
    }));

    // Status breakdown
    const statusBreakdown = [
      { status: 'COMPLETED', count: completedCount, amount: totalRevenue },
      { status: 'PENDING', count: pendingCount, amount: pendingAmount },
      { status: 'FAILED', count: failedCount, amount: failedAmount },
      { status: 'REFUNDED', count: refundedCount, amount: refundedAmount },
    ];

    // Recent transactions (last 10)
    const recentTransactions = payments.slice(0, 10);

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalRevenue: Number(totalRevenue.toFixed(2)),
          pendingAmount: Number(pendingAmount.toFixed(2)),
          refundedAmount: Number(refundedAmount.toFixed(2)),
          failedAmount: Number(failedAmount.toFixed(2)),
          completedCount,
          pendingCount,
          failedCount,
          refundedCount,
          totalTransactions: payments.length,
        },
        charts: {
          revenueByDate: revenueChartData,
          paymentMethods: paymentMethodData,
          statusBreakdown,
        },
        payments,
        recentTransactions,
      },
    });
  } catch (error) {
    console.error('Error fetching financial data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/finance - Update payment status (process refunds)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { paymentId, paymentStatus, transactionId } = body;

    if (!paymentId || !paymentStatus) {
      return NextResponse.json(
        { error: 'Payment ID and status are required' },
        { status: 400 }
      );
    }

    if (!['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'].includes(paymentStatus)) {
      return NextResponse.json(
        { error: 'Invalid payment status' },
        { status: 400 }
      );
    }

    // Update payment
    const updateData: any = {
      paymentStatus,
      updatedAt: new Date(),
    };

    if (paymentStatus === 'COMPLETED' && !transactionId) {
      updateData.paidAt = new Date();
    }

    if (transactionId) {
      updateData.transactionId = transactionId;
    }

    const updatedPayment = await prisma.payment.update({
      where: { id: paymentId },
      data: updateData,
      include: {
        booking: {
          include: {
            user: true,
            room: true,
          },
        },
      },
    });

    // If refunded, update booking status to cancelled
    if (paymentStatus === 'REFUNDED') {
      await prisma.booking.update({
        where: { id: updatedPayment.bookingId },
        data: { status: 'CANCELLED' },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Payment status updated to ${paymentStatus}`,
      data: updatedPayment,
    });
  } catch (error) {
    console.error('Error updating payment:', error);
    return NextResponse.json(
      { error: 'Failed to update payment' },
      { status: 500 }
    );
  }
}
