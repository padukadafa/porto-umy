"use client"
import React, { useState } from 'react';
import { ProjectCard } from '@/components/landing/ProjectCard';
import { projects } from '@/data/projects';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch projects from API
  const { data: apiProjects, mutate } = useSWR('/api/projects', fetcher);

  // Combine static projects with API projects
  const allProjects = [...projects, ...(apiProjects || [])];

  // Filter projects based on category and search term
  const filteredProjects = allProjects.filter(project => {
    const matchesFilter = filter === 'all' || project.category.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some((tech: string) => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const categories = ['all', ...Array.from(new Set(allProjects.map(p => p.category.toLowerCase())))];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-900">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-[120px] opacity-50 animate-pulse" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full blur-[150px] opacity-50 animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-yellow-200 to-orange-300 rounded-full blur-[140px] opacity-50 animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-gradient-to-r from-green-200 to-emerald-300 rounded-full blur-[130px] opacity-50 animate-pulse" style={{animationDelay: '3s'}} />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-20 pb-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent">
              My Projects
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore my complete portfolio of projects, from web applications to creative designs.
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none bg-white/80 backdrop-blur-sm"
            />
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    filter === category
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white'
                  }`}
                >
                  {category === 'all' ? 'All Projects' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="relative z-10 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Portfolio. Crafted with ❤️ using Next.js & React
          </p>
        </div>
      </footer>
    </main>
  );
};

export default ProjectsPage;
