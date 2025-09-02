import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    let profile = await prisma.profile.findFirst();

    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          name: '',
          title: '',
          description: '',
          bio: '',
          avatar: null,
          email: null,
          phone: null,
          location: null,
          website: null,
          resume: null,
          skills: [],
          education: undefined
        }
      });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();

    let profile = await prisma.profile.findFirst();

    if (profile) {
      profile = await prisma.profile.update({
        where: { id: profile.id },
        data: {
          name: data.name || '',
          title: data.title || '',
          description: data.description || '',
          bio: data.bio || '',
          avatar: data.avatar || null,
          email: data.email || null,
          phone: data.phone || null,
          location: data.location || null,
          website: data.website || null,
          resume: data.resume || null,
          linkedin: data.linkedin || null,
          github: data.github || null,
          skills: data.skills || [],
          education: data.education || undefined,
          languages: data.languages || [],
          experience: data.experience || null,
          availability: data.availability || 'available'
        }
      });
    } else {
      // Create new profile
      profile = await prisma.profile.create({
        data: {
          name: data.name || '',
          title: data.title || '',
          description: data.description || '',
          bio: data.bio || '',
          avatar: data.avatar || null,
          email: data.email || null,
          phone: data.phone || null,
          location: data.location || null,
          website: data.website || null,
          resume: data.resume || null,
          linkedin: data.linkedin || null,
          github: data.github || null,
          skills: data.skills || [],
          education: data.education || undefined,
          languages: data.languages || [],
          experience: data.experience || null,
          availability: data.availability || 'available'
        }
      });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
