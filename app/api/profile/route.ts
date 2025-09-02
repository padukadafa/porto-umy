import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/profile - Get profile data
export async function GET() {
  try {
    // For now, we'll get the first profile or create a default one
    // In a real app, you'd get the profile for the authenticated user
    let profile = await prisma.profile.findFirst();

    if (!profile) {
      // Create a default profile if none exists
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

// PUT /api/profile - Update profile data
export async function PUT(req: Request) {
  try {
    const data = await req.json();

    // For now, we'll update the first profile or create one if it doesn't exist
    // In a real app, you'd update the profile for the authenticated user
    let profile = await prisma.profile.findFirst();

    if (profile) {
      // Update existing profile
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
