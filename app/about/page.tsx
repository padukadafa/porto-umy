"use client";

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import {
  MapPin,
  Calendar,
  Coffee,
  Code2,
  Palette,
  Zap,
  Award,
  Lightbulb,
  Users
} from 'lucide-react';
import { Profile } from '@/types/profile';

const fetcher = (url: string) => fetch(url).then((res) => res.json()).then((data) => ({
  ...data,
  education: data.education ? (Array.isArray(data.education) ? data.education : JSON.parse(data.education)) : [],
  certificates: data.certificates ? (Array.isArray(data.certificates) ? data.certificates : JSON.parse(data.certificates)) : [],
  skills: data.skills || [],
  languages: data.languages || []
}));

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const { data: profile, error, isLoading } = useSWR<Profile>('/api/profile', fetcher);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { icon: <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />, value: profile?.skills?.length || 0, label: 'Keahlian' },
    { icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />, value: profile?.education?.length || 0, label: 'Pendidikan' },
    { icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />, value: profile?.certificates?.length || 0, label: 'Sertifikat' },
    { icon: <Coffee className="w-5 h-5 sm:w-6 sm:h-6" />, value: profile?.experience ? profile.experience.split('+')[0] : '0', label: 'Tahun Pengalaman' }
  ];

  const interests = [
    { icon: <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />, title: 'Web Development', desc: profile?.skills?.includes('React') || profile?.skills?.includes('Next.js') ? 'Building modern web applications with React and Next.js' : 'Creating beautiful and functional websites' },
    { icon: <Palette className="w-4 h-4 sm:w-5 sm:h-5" />, title: 'UI/UX Design', desc: profile?.skills?.includes('Figma') || profile?.skills?.includes('Design') ? 'Crafting intuitive user experiences and interfaces' : 'Designing user-friendly interfaces' },
    { icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />, title: 'Performance', desc: 'Optimizing applications for speed and efficiency' },
    { icon: <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />, title: 'Innovation', desc: profile?.skills?.length ? `Exploring ${profile.skills.length}+ technologies` : 'Always learning new technologies' }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const tabs = [
    { id: 'overview', label: 'Ringkasan' },
    { id: 'education', label: 'Pendidikan' },
    { id: 'skills', label: 'Keahlian' },
    { id: 'certificates', label: 'Sertifikat' }
  ];

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!profile) return <div>No profile data</div>;

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className={`transition-all duration-1000 ease-in-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Profile Image/Avatar */}
              <div className="md:w-1/3 bg-gradient-to-br from-purple-600 to-blue-500 p-8 text-center">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto border-4 border-white shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-600">
                    {getInitials(profile.name)}
                  </div>
                )}
                <h2 className="mt-4 text-xl sm:text-2xl font-bold text-white">{profile.name}</h2>
                <p className="text-purple-200 text-sm sm:text-base">{profile.title}</p>
                
                <div className="mt-4 flex items-center justify-center text-purple-200 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{profile.location}</span>
                </div>
                
                <div className="mt-2 flex items-center justify-center text-purple-200 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{profile.experience}+ years experience</span>
                </div>
              </div>

              {/* Stats & Content */}
              <div className="md:w-2/3 p-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-3">
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex space-x-4" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`${
                          activeTab === tab.id
                            ? 'border-purple-500 text-purple-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="prose prose-purple max-w-none">
                  {activeTab === 'overview' && (
                    <div>
                      <p className="text-gray-600">{profile.bio}</p>
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {interests.map((interest, index) => (
                          <div key={index} className="flex space-x-3">
                            <div className="flex-shrink-0">
                              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-purple-100 text-purple-600">
                                {interest.icon}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{interest.title}</h3>
                              <p className="mt-1 text-sm text-gray-500">{interest.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'education' && (
                    <div className="space-y-6">
                      {profile.education.map((edu: any, index: number) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-start">
                          <div className="flex-shrink-0 w-full sm:w-32 font-medium text-purple-600">
                            {edu.year}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
                            <p className="mt-1 text-gray-500">{edu.school}</p>
                            {edu.description && (
                              <p className="mt-2 text-sm text-gray-500">{edu.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'skills' && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {profile.skills.map((skill: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Code2 className="w-4 h-4 text-purple-600" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'certificates' && (
                    <div className="space-y-6">
                      {profile.certificates.map((cert: any, index: number) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-start">
                          <div className="flex-shrink-0 w-full sm:w-32 font-medium text-purple-600">
                            {cert.year}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{cert.name}</h3>
                            <p className="mt-1 text-gray-500">{cert.issuer}</p>
                            {cert.description && (
                              <p className="mt-2 text-sm text-gray-500">{cert.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;