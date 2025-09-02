"use client"
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import {
    MapPin,
    Calendar,
    Coffee,
    Code2,
    Palette,
    Zap, Award, Lightbulb,
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
    { icon: <Code2 className="w-6 h-6" />, value: profile?.skills?.length || 0, label: 'Keahlian' },
    { icon: <Users className="w-6 h-6" />, value: profile?.education?.length || 0, label: 'Pendidikan' },
    { icon: <Award className="w-6 h-6" />, value: profile?.certificates?.length || 0, label: 'Sertifikat' },
    { icon: <Coffee className="w-6 h-6" />, value: profile?.experience ? profile.experience.split('+')[0] : '0', label: 'Tahun Pengalaman' }
  ];

  const interests = [
    { icon: <Code2 className="w-5 h-5" />, title: 'Web Development', desc: profile?.skills?.includes('React') || profile?.skills?.includes('Next.js') ? 'Building modern web applications with React and Next.js' : 'Creating beautiful and functional websites' },
    { icon: <Palette className="w-5 h-5" />, title: 'UI/UX Design', desc: profile?.skills?.includes('Figma') || profile?.skills?.includes('Design') ? 'Crafting intuitive user experiences and interfaces' : 'Designing user-friendly interfaces' },
    { icon: <Zap className="w-5 h-5" />, title: 'Performance', desc: 'Optimizing applications for speed and efficiency' },
    { icon: <Lightbulb className="w-5 h-5" />, title: 'Innovation', desc: profile?.skills?.length ? `Exploring ${profile.skills.length}+ technologies` : 'Always learning new technologies' }
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

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Memuat profil...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Gagal memuat profil</h2>
            <p className="text-gray-600">Silakan coba lagi nanti.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-medium mb-4">
                <Users className="w-4 h-4" />
                <span>Tentang Saya</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent mb-6">
                {profile?.name ? `Kenali ${profile.name.split(' ')[0]} Lebih Baik` : 'Kenali Saya Lebih Baik'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {profile?.description || profile?.bio || "I'm a passionate developer who loves creating digital experiences that make a difference."}
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
                  {profile?.avatar ? (
                    <img 
                      src={profile.avatar} 
                      alt={profile.name} 
                      className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                      {profile ? getInitials(profile.name) : 'JD'}
                    </div>
                  )}
                  <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white ${
                    profile?.availability === 'available' ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{profile?.name || 'John Developer'}</h3>
                <p className="text-purple-600 font-medium mb-4">{profile?.title || 'Full Stack Developer'}</p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  {profile?.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span className="capitalize">{profile?.availability || 'Available'}</span>
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Halo! Saya {profile?.name?.split(' ')[0] || 'seorang Developer'}
                      {profile?.title && `, ${profile.title}`}
                    </h3>
                    <div className="space-y-4 text-gray-600 leading-relaxed">
                      <p>
                        {profile?.bio || "I'm a passionate full-stack developer with over 3 years of experience creating digital solutions that combine beautiful design with powerful functionality. My journey in tech started with curiosity and has evolved into a deep love for crafting exceptional user experiences."}
                      </p>
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Yang Saya Sukai Lakukan</h4>
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">Latar Belakang Pendidikan Saya</h3>
                  <div className="space-y-8">
                    {profile?.education && profile.education.length > 0 ? profile.education.map((item: any, index: number) => (
                      <div key={index} className="flex items-start space-x-6">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${[
                          'from-blue-500 to-cyan-500',
                          'from-purple-500 to-pink-500',
                          'from-orange-500 to-red-500',
                          'from-green-500 to-teal-500'
                        ][index % 4]} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                            <h4 className="text-xl font-bold text-gray-900">{item.degree}</h4>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full w-fit mt-1 sm:mt-0">
                              {item.year}
                            </span>
                          </div>
                          <p className="text-purple-600 font-medium mb-2">{item.institution}</p>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>Informasi pendidikan tidak tersedia</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">Keahlian Teknis</h3>
                  <div className="space-y-6">
                    {profile?.skills && profile.skills.length > 0 ? profile.skills.map((skill: string, index: number) => (
                      <div key={index} className="p-6 bg-gray-50 rounded-2xl hover:bg-purple-50 transition-colors group">
                        <div className="flex items-start space-x-4">
                          <div className="text-purple-600 group-hover:text-purple-700">
                            <Code2 className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900">{skill}</h4>
                            <p className="text-gray-600">Mahir dalam {skill}</p>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>Informasi keahlian tidak tersedia</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-8 p-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white">
                    <h4 className="text-xl font-bold mb-3">Selalu Belajar</h4>
                    <p className="leading-relaxed">
                      Technology evolves rapidly, and I'm committed to continuous learning. Currently exploring 
                      {profile?.skills?.includes('AI') || profile?.skills?.includes('Machine Learning') ? ' AI/ML integration,' : ''}
                      {profile?.skills?.includes('Web3') || profile?.skills?.includes('Blockchain') ? ' Web3 technologies,' : ''}
                      {profile?.skills?.includes('Cloud') || profile?.skills?.includes('AWS') ? ' advanced cloud architectures,' : ''}
                      and staying at the forefront of development trends.
                      {profile?.languages?.length ? ` I speak ${profile.languages.join(', ')}.` : ''}
                    </p>
                  </div>
                </div>
              )}

              {/* Certificates Tab */}
              {activeTab === 'certificates' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">Sertifikat & Penghargaan</h3>
                  <div className="space-y-6">
                    {profile?.certificates && profile.certificates.length > 0 ? profile.certificates.map((cert: any, index: number) => (
                      <div key={index} className="p-6 bg-gray-50 rounded-2xl hover:bg-purple-50 transition-colors group">
                        <div className="flex items-start space-x-4">
                          <div className="text-purple-600 group-hover:text-purple-700">
                            <Award className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                              <h4 className="text-xl font-bold text-gray-900">{cert.name}</h4>
                              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full w-fit mt-1 sm:mt-0">
                                {cert.date}
                              </span>
                            </div>
                            <p className="text-purple-600 font-medium mb-2">{cert.issuer}</p>
                            {cert.description && (
                              <p className="text-gray-600">{cert.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-8 text-gray-500">
                        <div className="text-6xl mb-4">🏆</div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Sertifikat</h4>
                        <p>Sertifikat dan penghargaan akan ditampilkan di sini setelah ditambahkan di pengaturan.</p>
                      </div>
                    )}
                  </div>
                  {profile?.certificates && profile.certificates.length > 0 && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl text-white">
                      <h4 className="text-xl font-bold mb-3">Komitmen Terhadap Kualitas</h4>
                      <p className="leading-relaxed">
                        Sertifikat dan penghargaan ini mencerminkan komitmen saya terhadap pengembangan profesional dan
                        dedikasi untuk memberikan hasil terbaik dalam setiap proyek yang saya kerjakan.
                      </p>
                    </div>
                  )}
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Mari Bekerja Sama</h3>
            <p className="text-gray-600 mb-6">
              I'm {profile?.availability === 'available' ? 'currently available' : profile?.availability === 'open' ? 'open to opportunities' : 'always interested in'} discussing new opportunities and interesting projects. 
              Let's create something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {profile?.email && (
                <a 
                  href={`mailto:${profile.email}`} 
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Hubungi Saya
                </a>
              )}
              {profile?.website && (
                <a 
                  href={profile.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-colors"
                >
                  Lihat Karya Saya
                </a>
              )}
              {!profile?.email && !profile?.website && (
                <>
                  <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
                    Hubungi Saya
                  </button>
                  <button className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-colors">
                    Lihat Karya Saya
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    )}
      </div>
    </section>
  );
};

export default About;