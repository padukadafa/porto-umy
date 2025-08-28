"use client"
import { useState, useEffect } from 'react';
import {
    MapPin,
    Calendar,
    Coffee,
    Code2,
    Palette,
    Zap, Award,
    Target,
    Lightbulb,
    Users
} from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { icon: <Code2 className="w-6 h-6" />, value: '50+', label: 'Projects Completed' },
    { icon: <Users className="w-6 h-6" />, value: '30+', label: 'Happy Clients' },
    { icon: <Coffee className="w-6 h-6" />, value: '1000+', label: 'Cups of Coffee' },
    { icon: <Award className="w-6 h-6" />, value: '3+', label: 'Years Experience' }
  ];

  const interests = [
    { icon: <Code2 className="w-5 h-5" />, title: 'Web Development', desc: 'Creating beautiful and functional websites' },
    { icon: <Palette className="w-5 h-5" />, title: 'UI/UX Design', desc: 'Crafting intuitive user experiences' },
    { icon: <Zap className="w-5 h-5" />, title: 'Performance', desc: 'Optimizing for speed and efficiency' },
    { icon: <Lightbulb className="w-5 h-5" />, title: 'Innovation', desc: 'Always learning new technologies' }
  ];

  const education = [
    {
      year: '2018-2022',
      title: 'Bachelor of Computer Science',
      desc: 'Graduated with honors, specialized in Software Engineering',
      color: 'from-blue-500 to-cyan-500',
      institution: 'University of Technology'
    },
    {
      year: '2021',
      title: 'Web Development Bootcamp',
      desc: 'Intensive 6-month program focusing on modern web technologies',
      color: 'from-purple-500 to-pink-500',
      institution: 'Tech Academy'
    },
    {
      year: '2022',
      title: 'React Certification',
      desc: 'Advanced React development and state management',
      color: 'from-orange-500 to-red-500',
      institution: 'React Institute'
    },
    {
      year: '2023',
      title: 'Cloud Architecture',
      desc: 'AWS Solutions Architect certification and cloud deployment',
      color: 'from-green-500 to-teal-500',
      institution: 'Amazon Web Services'
    }
  ];

  const skills = [
    { 
      icon: <Code2 className="w-6 h-6" />, 
      title: 'Frontend Development', 
      desc: 'React, Next.js, TypeScript, Tailwind CSS',
      level: 95
    },
    { 
      icon: <Zap className="w-6 h-6" />, 
      title: 'Backend Development', 
      desc: 'Node.js, Express, Python, PostgreSQL',
      level: 85
    },
    { 
      icon: <Palette className="w-6 h-6" />, 
      title: 'UI/UX Design', 
      desc: 'Figma, Adobe XD, Responsive Design',
      level: 80
    },
    { 
      icon: <Target className="w-6 h-6" />, 
      title: 'Cloud & DevOps', 
      desc: 'AWS, Docker, CI/CD, Git',
      level: 75
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-medium mb-4">
            <Users className="w-4 h-4" />
            <span>About Me</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent mb-6">
            Get to Know Me Better
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate full-stack developer who loves creating digital experiences that make a difference.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* Profile Card */}
          <div className={`lg:col-span-1 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-8">
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <div className="w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    JD
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">John Developer</h3>
                <p className="text-purple-600 font-medium mb-4">Full Stack Developer</p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>Indonesia</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Available</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-purple-600 mb-2 flex justify-center">{stat.icon}</div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-purple-600 shadow-md'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 min-h-[500px]">
              
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Hello! I'm John</h3>
                    <div className="space-y-4 text-gray-600 leading-relaxed">
                      <p>
                        I'm a passionate full-stack developer with over 3 years of experience creating 
                        digital solutions that combine beautiful design with powerful functionality. 
                        My journey in tech started with curiosity and has evolved into a deep love 
                        for crafting exceptional user experiences.
                      </p>
                      <p>
                        I specialize in modern web technologies including React, Next.js, Node.js, 
                        and cloud platforms. I believe in writing clean, maintainable code and 
                        staying up-to-date with the latest industry trends and best practices.
                      </p>
                      <p>
                        When I'm not coding, you'll find me exploring new technologies, contributing 
                        to open-source projects, or sharing knowledge with the developer community. 
                        I'm always excited about new challenges and opportunities to grow.
                      </p>
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-6">What I Love Doing</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {interests.map((interest, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors group">
                          <div className="text-purple-600 group-hover:text-purple-700 mt-1">
                            {interest.icon}
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-1">{interest.title}</h5>
                            <p className="text-sm text-gray-600">{interest.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Education Tab */}
              {activeTab === 'education' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">My Educational Background</h3>
                  <div className="space-y-8">
                    {education.map((item, index) => (
                      <div key={index} className="flex items-start space-x-6">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                            <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full w-fit mt-1 sm:mt-0">
                              {item.year}
                            </span>
                          </div>
                          <p className="text-purple-600 font-medium mb-2">{item.institution}</p>
                          <p className="text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">Technical Skills</h3>
                  <div className="space-y-6">
                    {skills.map((skill, index) => (
                      <div key={index} className="p-6 bg-gray-50 rounded-2xl hover:bg-purple-50 transition-colors group">
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="text-purple-600 group-hover:text-purple-700">
                            {skill.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-xl font-bold text-gray-900">{skill.title}</h4>
                              <span className="text-sm font-medium text-purple-600">{skill.level}%</span>
                            </div>
                            <p className="text-gray-600 mb-3">{skill.desc}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white">
                    <h4 className="text-xl font-bold mb-3">Always Learning</h4>
                    <p className="leading-relaxed">
                      Technology evolves rapidly, and I'm committed to continuous learning. Currently exploring 
                      AI/ML integration, Web3 technologies, and advanced cloud architectures to stay at the 
                      forefront of development trends.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Let's Work Together</h3>
            <p className="text-gray-600 mb-6">
              I'm always open to discussing new opportunities and interesting projects. 
              Let's create something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
                Get In Touch
              </button>
              <button className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-colors">
                View My Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;