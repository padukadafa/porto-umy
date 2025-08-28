"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { ProjectCard } from '@/components/landing/ProjectCard';
import useSWR from 'swr';
import { Project } from '@/types/project';
import { Code, Palette, Star, Zap, Search, X } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

  // Fetch projects from API
  const { data: apiProjects, error, isLoading } = useSWR('/api/projects', fetcher);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

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

  // Get all published projects from database
  const allProjects = apiProjects ? apiProjects.filter((p: any) => p.published).map(transformProject) : [];

  // Filter projects based on category and search term with improved search logic
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project: Project) => {
      // Category filter
      const matchesFilter = filter === 'all' || 
                           project.category.toLowerCase().includes(filter.toLowerCase()) ||
                           filter === project.category.toLowerCase();

      // Enhanced search logic
      const searchLower = debouncedSearchTerm.toLowerCase();
      const matchesSearch = !debouncedSearchTerm || 
                           project.title.toLowerCase().includes(searchLower) ||
                           project.description.toLowerCase().includes(searchLower) ||
                           project.fullDescription.toLowerCase().includes(searchLower) ||
                           project.technologies.some((tech: string) => tech.toLowerCase().includes(searchLower)) ||
                           project.category.toLowerCase().includes(searchLower) ||
                           project.status.toLowerCase().includes(searchLower);

      return matchesFilter && matchesSearch;
    });
  }, [allProjects, filter, debouncedSearchTerm]);

  const categories: string[] = ['all', ...Array.from(new Set<string>(allProjects.map((p: Project) => p.category.toLowerCase())))];

  const clearSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
  };

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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects, technologies, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none bg-white/80 backdrop-blur-sm min-w-[300px]"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((category: string) => (
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

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-gray-600">
              {isLoading ? (
                'Loading projects...'
              ) : (
                `Showing ${filteredProjects.length} of ${allProjects.length} projects`
              )}
              {debouncedSearchTerm && (
                <span className="ml-2 text-purple-600 font-medium">
                  (filtered by: "{debouncedSearchTerm}")
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="relative z-10 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project: Project, index: number) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : isLoading ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⏳</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Loading projects...</h3>
              <p className="text-gray-600">Please wait while we fetch your projects.</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">❌</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Failed to load projects</h3>
              <p className="text-gray-600">Please try again later or check your connection.</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : allProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">�</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No published projects yet</h3>
              <p className="text-gray-600">Projects will appear here once they're published in the dashboard.</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No projects match your search</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filter criteria.
              </p>
              {(searchTerm || filter !== 'all') && (
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setFilter('all');
                  }}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
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
