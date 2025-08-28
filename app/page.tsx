"use client"
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { SplineScene } from '@/components/SplineScene';
import SkillSection from '@/components/landing/SkillSection';
import ContactSection from '@/components/landing/ContactSection';
import { ProjectCard } from '@/components/landing/ProjectCard';
import { projects } from '@/data/projects';


interface SectionProps {
  id: string;
  title?: string;
  kicker?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ 
  id, 
  title, 
  kicker, 
  children, 
  className = "" 
}) => (
  <section id={id} className={`py-20 px-6 lg:px-8 ${className}`}>
    <div className="max-w-7xl mx-auto">
      {(kicker || title) && (
        <div className="text-center mb-16">
          {kicker && (
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
              {kicker}
            </span>
          )}
          {title && (
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent mb-6">
              {title}
            </h2>
          )}
        </div>
      )}
      {children}
    </div>
  </section>
);
const ModernPortfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

 

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className=" min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-900 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-[120px] opacity-50 animate-pulse" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full blur-[150px] opacity-50 animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-yellow-200 to-orange-300 rounded-full blur-[140px] opacity-50 animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-gradient-to-r from-green-200 to-emerald-300 rounded-full blur-[130px] opacity-50 animate-pulse" style={{animationDelay: '3s'}} />
      </div>

      <Section id="hero" className="min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            

            <div className="text-center lg:text-left">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 rounded-full text-sm font-medium backdrop-blur-sm border border-purple-200">
                  Welcome to My Universe 🚀
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent">
                  John
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Developer
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Crafting immersive digital experiences with cutting-edge 3D technology, 
                modern web development, and creative design thinking.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button 
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                  onClick={() => scrollToSection('projects')}
                >
                  View My Work
                </button>
                <button 
                  className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 rounded-xl font-semibold border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300"
                  onClick={() => scrollToSection('contact')}
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
          
          <div className={`transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <SplineScene 
              url="https://prod.spline.design/4oTATsIDqIwKkzLV/scene.splinecode" 
              // className="shadow-2xl"
            />
          </div>
        </div>

        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() => scrollToSection('projects')}
        >
          <ChevronDown className="w-6 h-6 text-purple-600" />
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="Featured Projects" kicker="My Work" className="bg-white/30 backdrop-blur-sm">
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </Section>

      <SkillSection />

      {/* Contact Section */}
          <ContactSection />
      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 John Developer Portfolio. Crafted with ❤️ using Spline, React & Next.js
          </p>
        </div>
      </footer>
    </main>
  );
};

export default ModernPortfolio;