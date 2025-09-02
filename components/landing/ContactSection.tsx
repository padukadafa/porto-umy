import { Github, Linkedin, Mail, Phone, MapPin, Globe, FileText, Send, Sparkles, Heart } from "lucide-react";
import { Section } from "../Section";
import { Profile } from "@/types/profile";
import { useState, useEffect } from "react";

interface ContactSectionProps {
  profile?: Profile;
}

const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [clickedButton, setClickedButton] = useState<string | null>(null);
  const [showParticles, setShowParticles] = useState(false);

  const handleContactClick = (type: 'email' | 'phone' | 'linkedin' | 'github' | 'website' | 'resume') => {
    setClickedButton(type);
    setShowParticles(true);

    const urls = {
      email: profile?.email ? `mailto:${profile.email}` : 'mailto:your-email@example.com',
      phone: profile?.phone ? `tel:${profile.phone}` : 'tel:+1234567890',
      linkedin: profile?.linkedin || 'https://linkedin.com/in/your-profile',
      github: profile?.github || 'https://github.com/your-username',
      website: profile?.website || 'https://yourwebsite.com',
      resume: profile?.resume || 'https://drive.google.com/your-resume'
    };

    setTimeout(() => {
      if (type === 'email' || type === 'phone') {
        window.location.href = urls[type];
      } else {
        window.open(urls[type], '_blank');
      }
      setClickedButton(null);
      setShowParticles(false);
    }, 600);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowParticles(false), 2000);
    return () => clearTimeout(timer);
  }, [showParticles]);

  const contactCards = [
    {
      type: 'email',
      icon: Mail,
      label: 'Email',
      value: profile?.email,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      available: !!profile?.email
    },
    {
      type: 'phone',
      icon: Phone,
      label: 'Phone',
      value: profile?.phone,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      available: !!profile?.phone
    },
    {
      type: 'location',
      icon: MapPin,
      label: 'Location',
      value: profile?.location,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      available: !!profile?.location
    },
    {
      type: 'linkedin',
      icon: Linkedin,
      label: 'LinkedIn',
      value: profile?.linkedin,
      color: 'from-blue-600 to-blue-800',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconColor: 'text-blue-700',
      iconBg: 'bg-blue-100',
      available: !!profile?.linkedin
    },
    {
      type: 'github',
      icon: Github,
      label: 'GitHub',
      value: profile?.github,
      color: 'from-gray-700 to-gray-900',
      bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
      iconColor: 'text-gray-700',
      iconBg: 'bg-gray-100',
      available: !!profile?.github
    },
    {
      type: 'website',
      icon: Globe,
      label: 'Website',
      value: profile?.website,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-50',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      available: !!profile?.website
    },
    {
      type: 'resume',
      icon: FileText,
      label: 'Resume',
      value: profile?.resume,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      available: !!profile?.resume
    }
  ];

  return (
    <Section
      id="contact"
      title="Mari Buat Sesuatu yang Luar Biasa"
      kicker="Mari Terhubung"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Floating Particles */}
        {showParticles && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              ></div>
            ))}
          </div>
        )}
      </div>

      {/* Konten */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Interactive Description */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent mb-6">
                Siap Membuat Sesuatu yang
                <span className="block text-purple-600">Luar Biasa?</span>
              </h2>
            </div>

            <div className="relative">
              <p className="text-xl text-gray-700 leading-relaxed mb-8 relative z-10">
                Mari wujudkan visi Anda menjadi kenyataan! Baik itu pengalaman web mutakhir,
                solusi 3D inovatif, atau produk digital kreatif, saya di sini untuk mewujudkan ide Anda.
                {profile?.name && (
                  <span className="font-semibold text-purple-600">
                    {" "}Mari buat sesuatu yang luar biasa bersama, {profile.name.split(' ')[0]}!
                  </span>
                )}
              </p>

              {/* Animated Heart Icon */}
              <div className="absolute -right-8 top-4 animate-bounce delay-1000">
                <Heart className="w-6 h-6 text-red-400 fill-current" />
              </div>
            </div>

            {profile?.location && (
              <div className="flex items-center space-x-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Berbasis di</p>
                  <p className="text-lg font-semibold text-gray-900">{profile.location}</p>
                </div>
              </div>
            )}

            {/* Interactive Contact Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {contactCards.filter(card => card.available).map((card, index) => {
                const Icon = card.icon;
                return (
                  <button
                    key={card.type}
                    onClick={() => handleContactClick(card.type as any)}
                    onMouseEnter={() => setHoveredCard(card.type)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`group relative overflow-hidden px-6 py-4 bg-gradient-to-br ${card.color} text-white rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 ${
                      clickedButton === card.type ? 'animate-pulse scale-95' : ''
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    {/* Button Background Effect */}
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Ripple Effect */}
                    <div className={`absolute inset-0 bg-white/30 rounded-2xl scale-0 group-active:scale-100 transition-transform duration-300 ${
                      clickedButton === card.type ? 'scale-100' : ''
                    }`}></div>

                    <div className="relative flex flex-col items-center space-y-2">
                      <Icon className={`w-6 h-6 transition-transform duration-300 ${
                        hoveredCard === card.type ? 'scale-110 rotate-12' : ''
                      }`} />
                      <span className="text-sm font-medium">{card.label}</span>
                    </div>

                    {/* Sparkle Effect */}
                    {hoveredCard === card.type && (
                      <div className="absolute -top-2 -right-2">
                        <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
                      </div>
                    )}
                  </button>
                );
              })}

              {/* Fallback buttons if no profile data */}
              {contactCards.filter(card => card.available).length === 0 && (
                <>
                  <button
                    onClick={() => handleContactClick('email')}
                    className="group relative overflow-hidden px-6 py-4 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex flex-col items-center space-y-2">
                      <Mail className="w-6 h-6" />
                      <span className="text-sm font-medium">Email</span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleContactClick('linkedin')}
                    className="group relative overflow-hidden px-6 py-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex flex-col items-center space-y-2">
                      <Linkedin className="w-6 h-6" />
                      <span className="text-sm font-medium">LinkedIn</span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleContactClick('github')}
                    className="group relative overflow-hidden px-6 py-4 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex flex-col items-center space-y-2">
                      <Github className="w-6 h-6" />
                      <span className="text-sm font-medium">GitHub</span>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Side - Enhanced Contact Information Grid */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent mb-2">
                Informasi Kontak
              </h3>
              <p className="text-gray-600">Semua cara untuk menghubungi saya</p>
            </div>

            <div className="grid gap-4">
              {contactCards.filter(card => card.available).map((card, index) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.type}
                    className={`group relative overflow-hidden p-6 ${card.bgColor} rounded-2xl border border-white/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer ${
                      hoveredCard === card.type ? 'ring-2 ring-purple-300 ring-opacity-50' : ''
                    }`}
                    onMouseEnter={() => setHoveredCard(card.type)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => handleContactClick(card.type as any)}
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animation: 'fadeInUp 0.8s ease-out forwards'
                    }}
                  >
                    {/* Card Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                    {/* Animated Border */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                    <div className="relative flex items-center space-x-4">
                      <div className={`flex-shrink-0 w-14 h-14 ${card.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                        <Icon className={`w-7 h-7 ${card.iconColor} transition-transform duration-300 ${
                          hoveredCard === card.type ? 'rotate-12 scale-110' : ''
                        }`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-500 mb-1">{card.label}</p>
                        <p className="text-gray-900 font-medium truncate group-hover:text-purple-700 transition-colors duration-300">
                          {card.value}
                        </p>
                      </div>

                      {/* Arrow Indicator */}
                      <div className={`transition-transform duration-300 ${
                        hoveredCard === card.type ? 'translate-x-1' : ''
                      }`}>
                        <Send className="w-5 h-5 text-gray-400 group-hover:text-purple-500" />
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </div>
                );
              })}
            </div>

            {/* Call to Action */}
            <div className="text-center lg:text-left mt-8">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <Sparkles className="w-5 h-5" />
                <span>Mari Mulai Percakapan!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
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
      `}</style>
    </Section>
  );
}

export default ContactSection;
