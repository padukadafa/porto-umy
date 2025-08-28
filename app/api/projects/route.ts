import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/projects - Get all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const project = await prisma.project.create({
      data: {
        title: data.title,
        category: data.category || '',
        description: data.description,
        fullDescription: data.fullDescription || '',
        technologies: data.technologies || [],
        images: data.images || [],
        github: data.github || null,
        demo: data.demo || null,
        rating: data.rating || 0,
        icon: data.icon || '',
        duration: data.duration || '',
        team: data.team || '',
        status: data.status || 'draft',
        challenges: data.challenges || [],
        solutions: data.solutions || [],
        features: data.features || [],
        objectives: data.objectives || [],
        results: data.results || [],
        testimonial: data.testimonial || null,
        published: data.published || false
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}