import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/projects/[id] - Get a single project
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id] - Update a project
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();

    const project = await prisma.project.update({
      where: { id: parseInt(id) },
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
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Delete a project
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.project.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
