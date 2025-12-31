import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/admin/communications - Get bookings for communication and templates
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'templates') {
      // Return predefined message templates
      const templates = [
        {
          id: 'booking-confirmation',
          name: 'Booking Confirmation',
          subject: 'Your Paradise Resort Booking is Confirmed!',
          message: 'Dear {{guestName}},\n\nThank you for booking with Paradise Resort!\n\nBooking Details:\n- Booking ID: {{bookingId}}\n- Room: {{roomName}}\n- Check-in: {{checkIn}}\n- Check-out: {{checkOut}}\n- Total Amount: ${{totalAmount}}\n\nWe look forward to welcoming you!\n\nBest regards,\nParadise Resort Team',
          category: 'booking',
        },
        {
          id: 'check-in-reminder',
          name: 'Check-in Reminder',
          subject: 'Reminder: Your Check-in at Paradise Resort Tomorrow',
          message: 'Dear {{guestName}},\n\nThis is a friendly reminder that your check-in is scheduled for tomorrow, {{checkIn}}.\n\nYour Room: {{roomName}}\nBooking ID: {{bookingId}}\n\nCheck-in time: 3:00 PM\nCheck-out time: 11:00 AM\n\nPlease bring a valid ID and your booking confirmation.\n\nSee you soon!\nParadise Resort Team',
          category: 'reminder',
        },
        {
          id: 'check-out-reminder',
          name: 'Check-out Reminder',
          subject: 'Check-out Reminder - Paradise Resort',
          message: 'Dear {{guestName}},\n\nYour check-out is scheduled for {{checkOut}}.\n\nPlease ensure:\n- Check-out by 11:00 AM\n- All room belongings are collected\n- Room key is returned to reception\n\nThank you for staying with us!\n\nParadise Resort Team',
          category: 'reminder',
        },
        {
          id: 'payment-reminder',
          name: 'Payment Reminder',
          subject: 'Payment Pending - Paradise Resort',
          message: 'Dear {{guestName}},\n\nWe noticed that the payment for your booking (ID: {{bookingId}}) is still pending.\n\nAmount Due: ${{totalAmount}}\nRoom: {{roomName}}\nCheck-in: {{checkIn}}\n\nPlease complete the payment to confirm your reservation.\n\nThank you,\nParadise Resort Team',
          category: 'payment',
        },
        {
          id: 'thank-you',
          name: 'Thank You Message',
          subject: 'Thank You for Staying with Paradise Resort',
          message: 'Dear {{guestName}},\n\nThank you for choosing Paradise Resort for your stay!\n\nWe hope you had a wonderful experience. Your feedback is valuable to us - please take a moment to share your thoughts.\n\nWe look forward to welcoming you again soon!\n\nWarm regards,\nParadise Resort Team',
          category: 'post-stay',
        },
        {
          id: 'cancellation',
          name: 'Booking Cancellation',
          subject: 'Booking Cancellation Confirmation',
          message: 'Dear {{guestName}},\n\nYour booking (ID: {{bookingId}}) has been cancelled as requested.\n\nCancelled Booking Details:\n- Room: {{roomName}}\n- Check-in: {{checkIn}}\n- Check-out: {{checkOut}}\n\nRefund will be processed within 5-7 business days.\n\nWe hope to serve you in the future!\n\nParadise Resort Team',
          category: 'cancellation',
        },
        {
          id: 'special-offer',
          name: 'Special Offer',
          subject: 'Exclusive Offer Just for You!',
          message: 'Dear {{guestName}},\n\nWe have a special offer just for you!\n\n🌟 LIMITED TIME OFFER 🌟\n\nEnjoy 20% off your next booking when you stay with us before the end of the season.\n\nUse promo code: WELCOME20\n\nBook now at paradiseresort.com\n\nBest regards,\nParadise Resort Team',
          category: 'marketing',
        },
      ];

      return NextResponse.json({
        success: true,
        data: templates,
      });
    }

    // Get bookings for communication
    const status = searchParams.get('status');
    const upcoming = searchParams.get('upcoming') === 'true';
    const checkingInTomorrow = searchParams.get('checkingInTomorrow') === 'true';
    const checkingOutToday = searchParams.get('checkingOutToday') === 'true';

    let whereClause: any = {};

    if (status) {
      whereClause.status = status;
    }

    if (upcoming) {
      whereClause.checkIn = {
        gte: new Date(),
      };
      whereClause.status = 'CONFIRMED';
    }

    if (checkingInTomorrow) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const dayAfter = new Date(tomorrow);
      dayAfter.setDate(dayAfter.getDate() + 1);

      whereClause.checkIn = {
        gte: tomorrow,
        lt: dayAfter,
      };
      whereClause.status = 'CONFIRMED';
    }

    if (checkingOutToday) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      whereClause.checkOut = {
        gte: today,
        lt: tomorrow,
      };
      whereClause.status = 'CONFIRMED';
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      include: {
        user: true,
        room: true,
        payment: true,
      },
      orderBy: {
        checkIn: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error('Error fetching communications data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/admin/communications - Send communications
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
      case 'send-email':
        // Simulate sending email
        const { recipients, subject, message, messageType } = data;
        
        // In production, integrate with email service like SendGrid, AWS SES, etc.
        console.log('Sending email to:', recipients);
        console.log('Subject:', subject);
        console.log('Message:', message);
        console.log('Type:', messageType);

        result = {
          sent: recipients.length,
          message: `Successfully sent ${messageType || 'email'} to ${recipients.length} recipient(s)`,
          timestamp: new Date().toISOString(),
        };
        break;

      case 'send-sms':
        // Simulate sending SMS
        const { phoneNumbers, smsMessage } = data;
        
        // In production, integrate with SMS service like Twilio, AWS SNS, etc.
        console.log('Sending SMS to:', phoneNumbers);
        console.log('Message:', smsMessage);

        result = {
          sent: phoneNumbers.length,
          message: `Successfully sent SMS to ${phoneNumbers.length} recipient(s)`,
          timestamp: new Date().toISOString(),
        };
        break;

      case 'bulk-email':
        // Simulate bulk email
        const { userEmails, bulkSubject, bulkMessage } = data;
        
        console.log('Sending bulk email to:', userEmails.length, 'users');
        console.log('Subject:', bulkSubject);

        result = {
          sent: userEmails.length,
          message: `Successfully sent bulk email to ${userEmails.length} customer(s)`,
          timestamp: new Date().toISOString(),
        };
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
    console.error('Error sending communication:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send communication' },
      { status: 500 }
    );
  }
}
