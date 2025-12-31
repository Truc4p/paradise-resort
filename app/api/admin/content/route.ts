import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/admin/content - Get all content (amenities, offers, etc.)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    // Fetch amenities
    const amenities = await prisma.amenity.findMany({
      include: {
        _count: {
          select: {
            rooms: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    // Fetch special offers
    const offers = await prisma.specialOffer.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Fetch contact messages
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });

    // Fetch newsletter subscribers
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: {
        subscribedAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        amenities,
        offers,
        messages,
        subscribers,
      },
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/admin/content - Create content (amenity, offer, etc.)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { type, data } = body;

    let result;

    switch (type) {
      case 'amenity':
        result = await prisma.amenity.create({
          data: {
            name: data.name,
            icon: data.icon,
            description: data.description,
          },
        });
        break;

      case 'offer':
        result = await prisma.specialOffer.create({
          data: {
            title: data.title,
            description: data.description,
            discount: data.discount,
            validFrom: new Date(data.validFrom),
            validUntil: new Date(data.validUntil),
            isActive: data.isActive,
            code: data.code || null,
          },
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid content type' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message: `${type} created successfully`,
      data: result,
    });
  } catch (error: any) {
    console.error('Error creating content:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create content' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/content - Update content
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { type, id, data } = body;

    let result;

    switch (type) {
      case 'amenity':
        result = await prisma.amenity.update({
          where: { id },
          data: {
            name: data.name,
            icon: data.icon,
            description: data.description,
          },
        });
        break;

      case 'offer':
        result = await prisma.specialOffer.update({
          where: { id },
          data: {
            title: data.title,
            description: data.description,
            discount: data.discount,
            validFrom: new Date(data.validFrom),
            validUntil: new Date(data.validUntil),
            isActive: data.isActive,
            code: data.code || null,
          },
        });
        break;

      case 'message':
        result = await prisma.contactMessage.update({
          where: { id },
          data: {
            isRead: data.isRead,
          },
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid content type' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message: `${type} updated successfully`,
      data: result,
    });
  } catch (error: any) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update content' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/content - Delete content
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json(
        { error: 'Type and ID are required' },
        { status: 400 }
      );
    }

    switch (type) {
      case 'amenity':
        await prisma.amenity.delete({
          where: { id },
        });
        break;

      case 'offer':
        await prisma.specialOffer.delete({
          where: { id },
        });
        break;

      case 'message':
        await prisma.contactMessage.delete({
          where: { id },
        });
        break;

      case 'subscriber':
        await prisma.newsletterSubscriber.delete({
          where: { id },
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid content type' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message: `${type} deleted successfully`,
    });
  } catch (error: any) {
    console.error('Error deleting content:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete content' },
      { status: 500 }
    );
  }
}
