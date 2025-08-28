import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const socialId = parseInt(id);
    if (isNaN(socialId)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const social = await prisma.socialMedia.findUnique({
      where: { id: socialId }
    });

    if (!social) {
      return NextResponse.json(
        { error: 'Social media not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(social);
  } catch (error) {
    console.error('Error fetching social media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch social media' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const socialId = parseInt(id);
    if (isNaN(socialId)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, url, icon } = body;

    if (!name || !url) {
      return NextResponse.json(
        { error: 'Name and URL are required' },
        { status: 400 }
      );
    }

    const social = await prisma.socialMedia.update({
      where: { id: socialId },
      data: {
        name,
        url,
        icon: icon || ''
      }
    });

    return NextResponse.json(social);
  } catch (error) {
    console.error('Error updating social media:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Social media not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update social media' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const socialId = parseInt(id);
    if (isNaN(socialId)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    await prisma.socialMedia.delete({
      where: { id: socialId }
    });

    return NextResponse.json({ message: 'Social media deleted successfully' });
  } catch (error) {
    console.error('Error deleting social media:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Social media not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete social media' },
      { status: 500 }
    );
  }
}
