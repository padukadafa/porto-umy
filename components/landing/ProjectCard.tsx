import { Project } from "@/types/project";
import { ArrowRight, ExternalLink, Github, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails?: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  index, 
  onViewDetails 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleGithubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.github) {
      window.open(project.github, '_blank');
    }
  };

  const handleDemoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.demo) {
      window.open(project.demo, '_blank');
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(project.id);
    } else {
        router.push(`/projects/${project.id}`);
    }
  };

  // Get first image from images array, fallback to placeholder
  const primaryImage = project.images && project.images.length > 0 
    ? project.images[0] 
    : null;

  return (
    <div 
      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewDetails}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Project Image */}
      {primaryImage ? (
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={primaryImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-2 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${
              project.status === 'Completed' 
                ? 'bg-green-100/80 text-green-700' 
                : project.status === 'In Progress'
                ? 'bg-blue-100/80 text-blue-700'
                : 'bg-gray-100/80 text-gray-700'
            }`}>
              {project.status}
            </span>
          </div>

          {/* Duration Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-black/20 text-white backdrop-blur-sm">
              {project.duration}
            </span>
          </div>
        </div>
      ) : (
        <div className="h-48 w-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
          <div className="text-center">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-3 inline-block">
              {project.icon}
            </div>
            <p className="text-purple-600 font-medium">Project Preview</p>
          </div>
        </div>
      )}
      
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              {project.icon}
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-900">{project.title}</h3>
              <p className="text-sm text-purple-600">{project.category}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            {project.github && (
              <button 
                onClick={handleGithubClick}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                aria-label="View on GitHub"
              >
                <Github className="w-4 h-4 text-gray-600" />
              </button>
            )}
            {project.demo && (
              <button 
                onClick={handleDemoClick}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                aria-label="View demo"
              >
                <ExternalLink className="w-4 h-4 text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Project Description */}
        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Project Metadata */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <span>Team: {project.team}</span>
          <span>{project.technologies.length} technologies</span>
        </div>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-full font-medium">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < project.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">({project.rating}/5)</span>
          </div>
          <button 
            onClick={handleViewDetails}
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 font-medium group transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className={`w-4 h-4 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};