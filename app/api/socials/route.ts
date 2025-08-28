import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const socials = await prisma.socialMedia.findMany({
      orderBy: { id: 'desc' }
    });
    return NextResponse.json(socials);
  } catch (error) {
    console.error('Error fetching social media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch social media' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, url, icon } = body;

    if (!name || !url) {
      return NextResponse.json(
        { error: 'Name and URL are required' },
        { status: 400 }
      );
    }

    const social = await prisma.socialMedia.create({
      data: {
        name,
        url,
        icon: icon || ''
      }
    });

    return NextResponse.json(social, { status: 201 });
  } catch (error) {
    console.error('Error creating social media:', error);
    return NextResponse.json(
      { error: 'Failed to create social media' },
      { status: 500 }
    );
  }
}
