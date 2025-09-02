"use client"
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Sparkles, Zap, Heart, Star, MousePointer } from 'lucide-react';
import { SplineScene } from '@/components/SplineScene';
import SkillSection from '@/components/landing/SkillSection';
import ContactSection from '@/components/landing/ContactSection';
import { ProjectCard } from '@/components/landing/ProjectCard';
import useSWR from 'swr';
import { Project } from '@/types/project';
import { Profile } from '@/types/profile';
import { Code, Palette } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [ripples, setRipples] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Fetch projects from API
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data: apiProjects, error } = useSWR('/api/projects', fetcher);
  
  // Fetch profile data with proper data transformation
  const profileFetcher = (url: string) => fetch(url).then((res) => res.json()).then((data) => ({
    ...data,
    education: data.education ? (Array.isArray(data.education) ? data.education : JSON.parse(data.education)) : [],
    skills: data.skills || [],
    languages: data.languages || []
  }));
  const { data: profile } = useSWR<Profile>('/api/profile', profileFetcher);

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

  // Get published projects only
  const allProjects = apiProjects ? apiProjects.filter((p: any) => p.published).map(transformProject) : [];

  useEffect(() => {
    setIsLoaded(true);
    setIsVisible(true);
  }, []);

  // Enhanced scroll effects with parallax
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = window.scrollY;
      setScrollY(totalScroll);
      
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect for hero text
  useEffect(() => {
    if (isLoaded && profile?.name) {
      const fullText = `Halo! Saya ${profile.name.split(' ')[0]}, ${profile.title || 'Developer'}`;
      let currentIndex = 0;
      setIsTyping(true);
      
      const typeInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setTypedText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => setIsTyping(false), 1000);
        }
      }, 100);
      
      return () => clearInterval(typeInterval);
    }
  }, [isLoaded, profile]);

  // Ripple effect handler
  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  // Enhanced magnetic effect for buttons
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>, elementId: string) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;

    button.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
    setHoveredElement(elementId);
    createRipple(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    button.style.transform = 'translate(0px, 0px) scale(1)';
    setHoveredElement(null);
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

 

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className=" min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-900 overflow-hidden relative">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Interactive Cursor Follower */}
      {/* <div
        ref={cursorRef}
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-40 mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${isVisible ? 1 : 0})`
        }}
      ></div> */}

      {/* Floating Particles Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-[120px] opacity-50 animate-pulse" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full blur-[150px] opacity-50 animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-yellow-200 to-orange-300 rounded-full blur-[140px] opacity-50 animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-gradient-to-r from-green-200 to-emerald-300 rounded-full blur-[130px] opacity-50 animate-pulse" style={{animationDelay: '3s'}} />

        {/* Interactive Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-bounce`}
            style={{
              left: `${20 + i * 10}%`,
              top: `${10 + i * 8}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.3}s`
            }}
          ></div>
        ))}

        {/* Mouse-following particles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`follow-${i}`}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-40"
            style={{
              left: mousePosition.x + (i - 2) * 20,
              top: mousePosition.y + (i - 2) * 20,
              transition: 'all 0.5s ease-out',
              transitionDelay: `${i * 0.1}s`
            }}
          ></div>
        ))}

        {/* Dynamic color-changing orbs based on scroll */}
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-xl opacity-30 transition-all duration-1000"
          style={{
            background: `linear-gradient(45deg, 
              hsl(${120 + scrollY * 0.1}, 70%, 60%), 
              hsl(${240 + scrollY * 0.1}, 70%, 60%))`,
            transform: `translateY(${scrollY * 0.2}px) scale(${1 + scrollY * 0.0005})`
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full blur-xl opacity-30 transition-all duration-1000"
          style={{
            background: `linear-gradient(45deg, 
              hsl(${300 + scrollY * 0.15}, 70%, 60%), 
              hsl(${60 + scrollY * 0.15}, 70%, 60%))`,
            transform: `translateY(${scrollY * -0.15}px) scale(${1 + scrollY * 0.0003})`
          }}
        ></div>
      </div>

      <Section id="hero" className="min-h-screen flex items-center relative">
        {/* Interactive Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Geometric Shapes with enhanced animations */}
          <div 
            className="absolute top-20 right-20 w-32 h-32 border-2 border-purple-300/30 rounded-full animate-spin-slow hover:border-purple-400/50 transition-colors duration-500"
            style={{ transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.05}deg)` }}
          ></div>
          <div 
            className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rotate-45 animate-pulse hover:from-pink-300/30 hover:to-purple-300/30 transition-all duration-500"
            style={{ transform: `translateY(${scrollY * -0.08}px)` }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/4 w-16 h-16 border border-blue-300/40 rounded-lg animate-bounce hover:border-blue-400/60 transition-colors duration-500"
            style={{ 
              transform: `translateY(${scrollY * 0.12}px)`,
              animationDelay: '1s'
            }}
          ></div>

          {/* Enhanced Floating Icons */}
          <div 
            className="absolute top-32 left-32 animate-float cursor-pointer hover:scale-125 transition-transform duration-300"
            onMouseEnter={() => setHoveredElement('sparkles')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <Sparkles className={`w-8 h-8 text-purple-400/60 hover:text-purple-500 transition-colors duration-300 ${hoveredElement === 'sparkles' ? 'animate-pulse' : ''}`} />
          </div>
          <div 
            className="absolute bottom-40 right-40 animate-float-delayed cursor-pointer hover:scale-125 transition-transform duration-300"
            onMouseEnter={() => setHoveredElement('zap')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <Zap className={`w-6 h-6 text-blue-400/60 hover:text-blue-500 transition-colors duration-300 ${hoveredElement === 'zap' ? 'animate-bounce' : ''}`} />
          </div>
          <div 
            className="absolute top-1/3 right-1/3 animate-float cursor-pointer hover:scale-125 transition-transform duration-300"
            onMouseEnter={() => setHoveredElement('heart')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <Heart className={`w-5 h-5 text-pink-400/60 hover:text-pink-500 transition-colors duration-300 ${hoveredElement === 'heart' ? 'animate-pulse' : ''}`} />
          </div>

          {/* Morphing shapes on hover */}
          {hoveredElement && (
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="absolute w-20 h-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-sm animate-ping"
                style={{
                  left: mousePosition.x - 40,
                  top: mousePosition.y - 40,
                  animationDuration: '1.5s'
                }}
              ></div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center lg:text-left">
              {/* Interactive Welcome Badge */}
              <div className="mb-6 group cursor-pointer animate-on-scroll">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 rounded-full text-sm font-medium backdrop-blur-sm border border-purple-200 hover:border-purple-300 transition-all duration-300 group-hover:scale-105">
                  <MousePointer className="w-4 h-4 animate-pulse" />
                  {profile?.name ? `Selamat Datang di Dunia ${profile.name.split(' ')[0]}` : 'Selamat Datang di Dunia Saya'} 🚀
                </span>
              </div>

              {/* Typewriter Effect Title */}
              <div className="mb-6 animate-on-scroll">
                <h1 className="text-5xl lg:text-7xl font-bold">
                  <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent animate-gradient-x">
                    {profile?.name?.split(' ')[0] || 'John'}
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x" style={{animationDelay: '0.5s'}}>
                    {profile?.title?.split(' ')[0] || 'Developer'}
                  </span>
                </h1>
                {isTyping && (
                  <div className="mt-4 text-lg text-purple-600 font-mono">
                    {typedText}
                    <span className="animate-pulse">|</span>
                  </div>
                )}
              </div>

              {/* Interactive Description */}
              <div className="relative mb-8">
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0 group-hover:text-gray-700 transition-colors duration-300">
                  {profile?.description || profile?.bio || "Menciptakan pengalaman digital yang imersif dengan teknologi 3D mutakhir, pengembangan web modern, dan pemikiran desain kreatif."}
                </p>
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Magnetic Buttons with Ripple Effects */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-on-scroll">
                <div className="relative">
                  <button
                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                    onClick={() => scrollToSection('projects')}
                    onMouseEnter={(e) => handleMouseEnter(e, 'projects-btn')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-2">
                      <Star className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      Lihat Karya Saya
                    </div>
                  </button>
                  {/* Ripple Effects */}
                  {ripples.filter(ripple => hoveredElement === 'projects-btn').map((ripple) => (
                    <div
                      key={ripple.id}
                      className="absolute bg-white/30 rounded-full animate-ping"
                      style={{
                        left: ripple.x - 10,
                        top: ripple.y - 10,
                        width: 20,
                        height: 20,
                        animationDuration: '0.6s'
                      }}
                    ></div>
                  ))}
                </div>

                <div className="relative">
                  <button
                    className="group relative px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 rounded-xl font-semibold border border-gray-200 hover:border-purple-300 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                    onClick={() => scrollToSection('contact')}
                    onMouseEnter={(e) => handleMouseEnter(e, 'contact-btn')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-2">
                      <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      {profile?.email ? 'Hubungi Saya' : 'Mari Terhubung'}
                    </div>
                  </button>
                  {/* Ripple Effects */}
                  {ripples.filter(ripple => hoveredElement === 'contact-btn').map((ripple) => (
                    <div
                      key={ripple.id}
                      className="absolute bg-purple-400/30 rounded-full animate-ping"
                      style={{
                        left: ripple.x - 10,
                        top: ripple.y - 10,
                        width: 20,
                        height: 20,
                        animationDuration: '0.6s'
                      }}
                    ></div>
                  ))}
                </div>

                {isAuthenticated && (
                  <Link href="/dashboard">
                    <div className="relative">
                      <button
                        className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                        onMouseEnter={(e) => handleMouseEnter(e, 'dashboard-btn')}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative flex items-center gap-2">
                          <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                          Dashboard
                        </div>
                      </button>
                      {/* Ripple Effects */}
                      {ripples.filter(ripple => hoveredElement === 'dashboard-btn').map((ripple) => (
                        <div
                          key={ripple.id}
                          className="absolute bg-white/30 rounded-full animate-ping"
                          style={{
                            left: ripple.x - 10,
                            top: ripple.y - 10,
                            width: 20,
                            height: 20,
                            animationDuration: '0.6s'
                          }}
                        ></div>
                      ))}
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className={`transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative group">
              <SplineScene
                url="https://prod.spline.design/4oTATsIDqIwKkzLV/scene.splinecode"
              />
              {/* Interactive Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer group"
          onClick={() => scrollToSection('projects')}
        >
          <div className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            <ChevronDown className="w-6 h-6 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </div>
      </Section>

      {/* Projects Section with Enhanced Effects */}
      <Section id="projects" title="Proyek Unggulan" kicker="Karya Saya" className="bg-white/30 backdrop-blur-sm relative overflow-hidden">
        {/* Section Background Effects with Parallax */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          ></div>
          <div 
            className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-br from-pink-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse"
            style={{ 
              transform: `translateY(${scrollY * -0.03}px)`,
              animationDelay: '2s'
            }}
          ></div>
          
          {/* Interactive particles that respond to scroll */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`scroll-particle-${i}`}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full animate-pulse"
              style={{
                left: `${15 + i * 7}%`,
                top: `${20 + (i % 3) * 25}%`,
                transform: `translateY(${scrollY * (0.02 + i * 0.005)}px)`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + i * 0.2}s`
              }}
            ></div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          {allProjects.map((project: Project, index: number) => (
            <div
              key={project.id}
              className="group transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-on-scroll"
              style={{
                animationDelay: `${index * 200}ms`,
                animation: 'fadeInUp 0.8s ease-out forwards'
              }}
            >
              <ProjectCard project={project} index={index} />
              
              {/* Hover particle effects */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`project-particle-${index}-${i}`}
                    className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 2) * 40}%`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '1s'
                    }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {allProjects.length === 0 && !error && (
          <div className="text-center py-12 relative z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 animate-pulse">Memuat proyek...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12 relative z-10">
            <div className="text-red-500 mb-4">
              <Zap className="w-12 h-12 mx-auto animate-bounce" />
            </div>
            <p className="text-red-600 animate-pulse">Gagal memuat proyek. Silakan coba lagi nanti.</p>
          </div>
        )}
      </Section>

      <SkillSection profile={profile} />

      {/* Contact Section */}
          <ContactSection profile={profile} />
      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {profile?.name || 'John Developer'} Portfolio. Dibuat dengan ❤️ menggunakan Spline, React & Next.js
          </p>
        </div>
      </footer>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }

        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(147, 51, 234, 0.6);
          }
        }

        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes morph {
          0%, 100% { border-radius: 50%; }
          25% { border-radius: 25% 75% 50% 50%; }
          50% { border-radius: 75% 25% 50% 50%; }
          75% { border-radius: 50% 50% 25% 75%; }
        }

        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink {
          0%, 50% { border-color: transparent; }
          51%, 100% { border-color: currentColor; }
        }

        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% 200%;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-morph {
          animation: morph 8s ease-in-out infinite;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .typewriter {
          overflow: hidden;
          border-right: 2px solid;
          white-space: nowrap;
          animation: typewriter 2s steps(40, end), blink 0.75s step-end infinite;
        }

        .ripple-effect {
          position: relative;
          overflow: hidden;
        }

        .ripple-effect::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .ripple-effect:active::before {
          width: 300px;
          height: 300px;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced hover effects */
        .group:hover .group-hover\:scale-110 {
          transform: scale(1.1);
        }

        .group:hover .group-hover\:rotate-12 {
          transform: rotate(12deg);
        }

        /* Magnetic effect smooth transitions */
        button {
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Glassmorphism effects */
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        /* Gradient animations */
        .bg-gradient-to-r {
          background-size: 200% 200%;
        }

        /* Interactive particle effects */
        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: float-particle 3s ease-in-out infinite;
        }

        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.2); }
        }

        /* Dynamic color transitions */
        .dynamic-bg {
          transition: background 0.3s ease;
        }

        .dynamic-bg:hover {
          background: linear-gradient(45deg, 
            hsl(var(--hue, 260), 70%, 60%), 
            hsl(calc(var(--hue, 260) + 60), 70%, 60%)
          );
        }
      `}</style>
    </main>
  );
};

export default ModernPortfolio;