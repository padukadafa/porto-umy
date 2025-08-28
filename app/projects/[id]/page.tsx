"use client"
import React, { useState, useEffect } from 'react';
import {
  Star, Users,
  Code, Zap,
  Clock,
  Target,
  Lightbulb,
  CheckCircle,
  PlayCircle
} from 'lucide-react';
import { Project } from '@/types/project';
import { useRouter } from 'next/navigation';

// Types


// Image Gallery Component
interface ImageGalleryProps {
  images: string[];
  title: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div 
        className="relative h-96 w-full rounded-2xl overflow-hidden cursor-pointer group"
        onClick={() => setIsModalOpen(true)}
      >
        <img 
          src={images[selectedImage]}
          alt={`${title} - Main view`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <PlayCircle className="w-16 h-16 text-white" />
        </div>
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative h-20 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
              selectedImage === index 
                ? 'ring-4 ring-purple-500 scale-105' 
                : 'hover:scale-105 hover:ring-2 hover:ring-purple-300'
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <img 
              src={image}
              alt={`${title} - View ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-6xl max-h-full">
            <img 
              src={images[selectedImage]}
              alt={`${title} - Full size`}
              className="max-w-full max-h-full object-contain rounded-xl"
            />
            <button 
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Info Card Component
interface InfoCardProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
  color: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, items, icon, color }) => (
  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
    <div className="flex items-center space-x-3 mb-4">
      <div className={`p-2 ${color} rounded-lg text-white`}>
        {icon}
      </div>
      <h3 className="font-bold text-lg text-gray-900">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start space-x-2">
          <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
          <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Main Project Detail Component
const ProjectDetailPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const project: Project = {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    category: "Full Stack Web Application",
    description: "A comprehensive e-commerce platform with modern UI, secure payment integration, admin dashboard, and real-time inventory management.",
    fullDescription: "This project represents a complete end-to-end e-commerce solution built with modern web technologies. The platform features a responsive design, secure payment processing through Stripe, real-time inventory management, and a comprehensive admin dashboard. The application emphasizes performance, security, and user experience, incorporating advanced features like AI-powered product recommendations, multi-language support, and progressive web app capabilities.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS", "Redis", "Docker"],
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    ],
    github: "https://github.com/username/ecommerce-platform",
    demo: "https://ecommerce-demo.vercel.app",
    rating: 5,
    icon: <Zap className="w-5 h-5 text-white" />,
    duration: "4 months",
    team: "Solo Developer",
    status: "Completed",
    challenges: [
      "Implementing real-time inventory synchronization across multiple channels",
      "Ensuring PCI DSS compliance for payment processing",
      "Optimizing performance for large product catalogs",
      "Creating a scalable architecture for future growth"
    ],
    solutions: [
      "Built event-driven architecture using Redis for real-time updates",
      "Integrated Stripe for secure, compliant payment processing",
      "Implemented advanced caching strategies and database optimization",
      "Designed microservices architecture with Docker containerization"
    ],
    features: [
      "Responsive design optimized for all devices",
      "Advanced product search with filters and sorting",
      "Secure payment processing with Stripe integration",
      "Real-time inventory management",
      "Admin dashboard with analytics and reporting",
      "Multi-language support (i18n)",
      "Progressive Web App capabilities",
      "AI-powered product recommendations"
    ],
    objectives: [
      "Create a modern, user-friendly e-commerce experience",
      "Ensure secure and reliable payment processing",
      "Build a scalable platform for future growth",
      "Implement best practices for SEO and performance"
    ],
    results: [
      "98% lighthouse performance score achieved",
      "Zero security vulnerabilities in production",
      "50% faster page load times compared to legacy systems",
      "Increased user engagement by 40%"
    ],
    testimonial: {
      text: "The e-commerce platform exceeded our expectations. The clean design, fast performance, and robust features have significantly improved our online sales.",
      author: "Sarah Johnson",
      role: "Business Owner"
    }
  };

  const handleBack = () => {
    router.replace("/");
  };

  const handleGithubClick = () => {
    if (project.github) {
      window.open(project.github, '_blank');
    }
  };

  const handleDemoClick = () => {
    if (project.demo) {
      window.open(project.demo, '_blank');
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-900 mt-12">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full blur-[150px] opacity-30 animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-yellow-200 to-orange-300 rounded-full blur-[140px] opacity-30 animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      {/* Header */}
      {/* <header className="sticky top-20 z-40 bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Portfolio</span>
            </button>
            <div className="flex space-x-4">
              {project.github && (
                <button 
                  onClick={handleGithubClick}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </button>
              )}
              {project.demo && (
                <button 
                  onClick={handleDemoClick}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Project Header */}
        <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} mb-12`}>
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white">
              {project.icon}
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-2">
                {project.category}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent">
                {project.title}
              </h1>
            </div>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-4xl">
            {project.fullDescription}
          </p>

          {/* Project Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-bold text-gray-900">{project.duration}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Team</p>
              <p className="font-bold text-gray-900">{project.team}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-bold text-green-600">{project.status}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <div className="flex items-center justify-center space-x-1 mb-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < project.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">Rating</p>
              <p className="font-bold text-gray-900">{project.rating}/5</p>
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span key={index} className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full font-medium text-sm border border-purple-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className={`transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} mb-12`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h2>
          <ImageGallery images={project.images} title={project.title} />
        </div>

        {/* Project Details Grid */}
        <div className={`transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} grid lg:grid-cols-2 gap-8 mb-12`}>
          <InfoCard 
            title="Key Features"
            items={project.features}
            icon={<CheckCircle className="w-5 h-5" />}
            color="bg-gradient-to-r from-green-500 to-emerald-500"
          />
          <InfoCard 
            title="Project Objectives"
            items={project.objectives}
            icon={<Target className="w-5 h-5" />}
            color="bg-gradient-to-r from-blue-500 to-indigo-500"
          />
          <InfoCard 
            title="Challenges Faced"
            items={project.challenges}
            icon={<Lightbulb className="w-5 h-5" />}
            color="bg-gradient-to-r from-orange-500 to-red-500"
          />
          <InfoCard 
            title="Solutions Implemented"
            items={project.solutions}
            icon={<Code className="w-5 h-5" />}
            color="bg-gradient-to-r from-purple-500 to-pink-500"
          />
        </div>

        {/* Results Section */}
        <div className={`transform transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} mb-12`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Results</h2>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
            <div className="grid md:grid-cols-2 gap-6">
              {project.results.map((result, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 leading-relaxed">{result}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial */}
        {project.testimonial && (
          <div className={`transform transition-all duration-1000 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} mb-12`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Client Testimonial</h2>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
              <blockquote className="text-lg text-gray-700 italic mb-4">
                "{project.testimonial.text}"
              </blockquote>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {project.testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">{project.testimonial.author}</p>
                  <p className="text-purple-600 text-sm">{project.testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className={`transform transition-all duration-1000 delay-1100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} text-center`}>
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Interested in working together?</h3>
            <p className="text-purple-100 mb-6">
              Let's discuss your next project and bring your ideas to life.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                Get In Touch
              </button>
              <button 
                onClick={handleBack}
                className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300"
              >
                View More Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetailPage;