"use client"
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, User, Mail, Phone, MapPin, Globe, Upload, X, Code, Plus } from 'lucide-react';
import Link from 'next/link';

interface ProfileData {
  name: string;
  title: string;
  description: string;
  bio: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  resume: string;
  linkedin: string;
  github: string;
  skills: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
    description: string;
  }[];
  languages: string[];
  experience: string;
  availability: string;
  certificates: {
    title: string;
    issuer: string;
    year: string;
    description: string;
    url?: string;
  }[];
}

const SettingsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    title: '',
    description: '',
    bio: '',
    avatar: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    resume: '',
    linkedin: '',
    github: '',
    skills: [],
    education: [],
    languages: [],
    experience: '',
    availability: 'available',
    certificates: []
  });

  // Load profile data on component mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const data = await response.json();
          // Convert null values to empty strings for controlled inputs
          const sanitizedData = {
            ...data,
            email: data.email || '',
            phone: data.phone || '',
            location: data.location || '',
            website: data.website || '',
            resume: data.resume || '',
            linkedin: data.linkedin || '',
            github: data.github || '',
            experience: data.experience || '',
            availability: data.availability || 'available',
            skills: data.skills || [],
            languages: data.languages || [],
            education: data.education || [],
            certificates: data.certificates || []
          };
          setProfile(prev => ({ ...prev, ...sanitizedData }));
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    loadProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: errorData.error || 'Failed to update profile' });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({
          ...prev,
          avatar: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (isInitializing) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading settings...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-green-300 to-blue-300 rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-[150px] opacity-30 animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-20 pb-8 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-gray-900 via-green-800 to-blue-800 bg-clip-text text-transparent">
              Profile Settings
            </span>
          </h1>
          <p className="text-gray-600">Manage your personal information and portfolio settings</p>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className="relative z-10 px-6 lg:px-8 mb-6">
          <div className="max-w-4xl mx-auto">
            <div className={`flex items-center gap-3 p-4 rounded-lg border ${
              message.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              {message.type === 'success' ? (
                <Save className="w-5 h-5 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="font-medium">{message.text}</span>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="relative z-10 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3"></div>
                  <p className="text-gray-700 font-medium">Saving changes...</p>
                </div>
              </div>
            )}

            {/* Profile Picture Section */}
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Picture</h2>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center overflow-hidden">
                    {profile.avatar ? (
                      <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-white" />
                    )}
                  </div>
                  <label className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Upload a professional profile picture</p>
                  <p className="text-xs text-gray-500">Recommended: Square image, at least 400x400px</p>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={profile.title}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    placeholder="Full Stack Developer"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={profile.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-none"
                  placeholder="Brief description about yourself (2-3 sentences)"
                />
                <p className="text-sm text-gray-500 mt-1">{profile.description.length}/300 characters</p>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-none"
                  placeholder="Detailed biography and background information"
                />
                <p className="text-sm text-gray-500 mt-1">{profile.bio.length}/1000 characters</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-2" />
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={profile.website}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={profile.linkedin}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={profile.github}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    placeholder="https://github.com/yourusername"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume/CV URL
                  </label>
                  <input
                    type="url"
                    name="resume"
                    value={profile.resume}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    placeholder="https://drive.google.com/your-resume"
                  />
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={profile.experience}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    placeholder="e.g., 3+ years"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability Status
                  </label>
                  <select
                    name="availability"
                    value={profile.availability}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                  >
                    <option value="available">Available for work</option>
                    <option value="busy">Currently busy</option>
                    <option value="open">Open to opportunities</option>
                    <option value="not-available">Not available</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Skills & Technologies</h2>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Code className="w-4 h-4 inline mr-2" />
                  Add your skills (press Enter to add)
                </label>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="e.g., React, Node.js, Python"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const value = (e.target as HTMLInputElement).value.trim();
                        if (value && !profile.skills.includes(value)) {
                          setProfile(prev => ({
                            ...prev,
                            skills: [...prev.skills, value]
                          }));
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                </div>
                {profile.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => {
                            setProfile(prev => ({
                              ...prev,
                              skills: prev.skills.filter((_, i) => i !== index)
                            }));
                          }}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Languages Section */}
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Languages</h2>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add languages you speak (press Enter to add)
                </label>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="e.g., English, Indonesian, Spanish"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const value = (e.target as HTMLInputElement).value.trim();
                        if (value && !profile.languages.includes(value)) {
                          setProfile(prev => ({
                            ...prev,
                            languages: [...prev.languages, value]
                          }));
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                </div>
                {profile.languages.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {profile.languages.map((language, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                      >
                        {language}
                        <button
                          type="button"
                          onClick={() => {
                            setProfile(prev => ({
                              ...prev,
                              languages: prev.languages.filter((_, i) => i !== index)
                            }));
                          }}
                          className="ml-1 text-green-600 hover:text-green-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Education Section */}
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Education</h2>
              <div className="space-y-6">
                {profile.education && profile.education.length > 0 ? profile.education.map((edu, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Education #{index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => {
                          setProfile(prev => ({
                            ...prev,
                            education: prev.education.filter((_, i) => i !== index)
                          }));
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Degree/Program</label>
                        <input
                          type="text"
                          value={edu.degree || ''}
                          onChange={(e) => {
                            const newEducation = [...profile.education];
                            newEducation[index].degree = e.target.value;
                            setProfile(prev => ({ ...prev, education: newEducation }));
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                          placeholder="e.g., Bachelor of Computer Science"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                        <input
                          type="text"
                          value={edu.institution || ''}
                          onChange={(e) => {
                            const newEducation = [...profile.education];
                            newEducation[index].institution = e.target.value;
                            setProfile(prev => ({ ...prev, education: newEducation }));
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                          placeholder="e.g., University Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                        <input
                          type="text"
                          value={edu.year || ''}
                          onChange={(e) => {
                            const newEducation = [...profile.education];
                            newEducation[index].year = e.target.value;
                            setProfile(prev => ({ ...prev, education: newEducation }));
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                          placeholder="e.g., 2020-2024"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                        <input
                          type="text"
                          value={edu.description || ''}
                          onChange={(e) => {
                            const newEducation = [...profile.education];
                            newEducation[index].description = e.target.value;
                            setProfile(prev => ({ ...prev, education: newEducation }));
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                          placeholder="e.g., GPA: 3.8, Relevant coursework"
                        />
                      </div>
                    </div>
                  </div>
                )) : null}
                <button
                  type="button"
                  onClick={() => {
                    setProfile(prev => ({
                      ...prev,
                      education: [...(prev.education || []), { degree: '', institution: '', year: '', description: '' }]
                    }));
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Education
                </button>
              </div>
            </div>

            {/* Certificates Section */}
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Sertifikat & Penghargaan</h2>
              <div className="space-y-6">
                {profile.certificates && profile.certificates.length > 0 ? profile.certificates.map((cert, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Sertifikat #{index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => {
                          setProfile(prev => ({
                            ...prev,
                            certificates: prev.certificates.filter((_, i) => i !== index)
                          }));
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Sertifikat</label>
                        <input
                          type="text"
                          value={cert.title || ''}
                          onChange={(e) => {
                            const newCertificates = [...profile.certificates];
                            newCertificates[index].title = e.target.value;
                            setProfile(prev => ({ ...prev, certificates: newCertificates }));
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                          placeholder="e.g., AWS Certified Developer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Penerbit</label>
                        <input
                          type="text"
                          value={cert.issuer || ''}
                          onChange={(e) => {
                            const newCertificates = [...profile.certificates];
                            newCertificates[index].issuer = e.target.value;
                            setProfile(prev => ({ ...prev, certificates: newCertificates }));
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                          placeholder="e.g., Amazon Web Services"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tahun</label>
                        <input
                          type="text"
                          value={cert.year || ''}
                          onChange={(e) => {
                            const newCertificates = [...profile.certificates];
                            newCertificates[index].year = e.target.value;
                            setProfile(prev => ({ ...prev, certificates: newCertificates }));
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                          placeholder="e.g., 2023"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">URL Sertifikat (Opsional)</label>
                        <input
                          type="url"
                          value={cert.url || ''}
                          onChange={(e) => {
                            const newCertificates = [...profile.certificates];
                            newCertificates[index].url = e.target.value;
                            setProfile(prev => ({ ...prev, certificates: newCertificates }));
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                          placeholder="https://verify.certificate.com/..."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi (Opsional)</label>
                        <textarea
                          value={cert.description || ''}
                          onChange={(e) => {
                            const newCertificates = [...profile.certificates];
                            newCertificates[index].description = e.target.value;
                            setProfile(prev => ({ ...prev, certificates: newCertificates }));
                          }}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-none"
                          placeholder="Deskripsi singkat tentang sertifikat ini..."
                        />
                      </div>
                    </div>
                  </div>
                )) : null}
                <button
                  type="button"
                  onClick={() => {
                    setProfile(prev => ({
                      ...prev,
                      certificates: [...(prev.certificates || []), { title: '', issuer: '', year: '', description: '', url: '' }]
                    }));
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Sertifikat
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="p-8 bg-gray-50">
              <div className="flex justify-end gap-4">
                <Link
                  href="/dashboard"
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
