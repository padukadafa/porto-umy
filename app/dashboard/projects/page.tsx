"use client"
import React from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import useSWR from 'swr';
import { ProjectCard } from '@/components/landing/ProjectCard';
import { Project } from '@/types/project';
import { Code, Palette, Star, Zap } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

// Icon mapping for database icons
const iconMap: { [key: string]: React.ReactNode } = {
  'code': <Code className="w-5 h-5 text-white" />,
  'palette': <Palette className="w-5 h-5 text-white" />,
  'star': <Star className="w-5 h-5 text-white" />,
  'zap': <Zap className="w-5 h-5 text-white" />,
  'default': <Code className="w-5 h-5 text-white" />
};

// Transform database project to Project interface
const transformProject = (dbProject: any): Project => {
  return {
    id: dbProject.id.toString(),
    title: dbProject.title,
    category: dbProject.category,
    description: dbProject.description,
    fullDescription: dbProject.fullDescription,
    technologies: dbProject.technologies || [],
    images: dbProject.images || [],
    github: dbProject.github,
    demo: dbProject.demo,
    rating: Math.round(dbProject.rating),
    icon: iconMap[dbProject.icon] || iconMap['default'],
    duration: dbProject.duration,
    team: dbProject.team,
    status: dbProject.status,
    challenges: dbProject.challenges || [],
    solutions: dbProject.solutions || [],
    features: dbProject.features || [],
    objectives: dbProject.objectives || [],
    results: dbProject.results || [],
    testimonial: dbProject.testimonial ? {
      text: dbProject.testimonial.text,
      author: dbProject.testimonial.author,
      role: dbProject.testimonial.role
    } : undefined
  };
};

const ProjectsDashboardPage: React.FC = () => {
  const { data: apiProjects, mutate, error } = useSWR('/api/projects', fetcher);
  const allProjects = apiProjects ? apiProjects.map(transformProject) : [];

  const handleDelete = async (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`/api/projects/${projectId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          mutate();
        }
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  return (
    <div className="pt-8 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Manage Projects
              </span>
            </h1>
            <p className="text-gray-600">View and manage all your portfolio projects</p>
          </div>
          <Link
            href="/dashboard/projects/add"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Project
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="pb-20">
          {allProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProjects.map((project: Project, index: number) => (
                <div key={project.id || index} className="relative group">
                  <ProjectCard project={project} index={index} />

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <Link
                      href={`/dashboard/projects/${project.id}/edit`}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      title="Edit project"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first project</p>
              <Link
                href="/dashboard/projects/add"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Project
              </Link>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="pb-20">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Statistics</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{allProjects.length}</div>
                <p className="text-gray-600">Total Projects</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {allProjects.filter((p: Project) => p.status === 'Completed').length}
                </div>
                <p className="text-gray-600">Completed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {allProjects.filter((p: Project) => p.status === 'In Progress').length}
                </div>
                <p className="text-gray-600">In Progress</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {allProjects.filter((p: Project) => p.github).length}
                </div>
                <p className="text-gray-600">With GitHub</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsDashboardPage;