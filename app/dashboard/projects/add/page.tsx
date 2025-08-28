"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Star, ChevronDown, ChevronUp, CheckCircle, XCircle, Plus, X, Loader2, Code, Palette, Zap } from 'lucide-react';
import Link from 'next/link';

const AddProjectPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    details: false,
    technical: false,
    content: false,
    testimonial: false
  });

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    fullDescription: '',
    technologies: [] as string[],
    images: [] as string[],
    github: '',
    demo: '',
    rating: 5,
    icon: 'code',
    duration: '',
    team: '',
    status: 'Completed',
    challenges: [] as string[],
    solutions: [] as string[],
    features: [] as string[],
    objectives: [] as string[],
    results: [] as string[],
    published: false,
    testimonial: {
      text: '',
      author: '',
      role: ''
    }
  });

  // New input states for array fields
  const [newTechnology, setNewTechnology] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newChallenge, setNewChallenge] = useState('');
  const [newSolution, setNewSolution] = useState('');
  const [newObjective, setNewObjective] = useState('');
  const [newResult, setNewResult] = useState('');

  React.useEffect(() => {
    // Simulate initialization loading
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTestimonialChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      testimonial: {
        ...prev.testimonial,
        [field]: value
      }
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Array management functions
  const addItem = (field: keyof typeof formData, value: string, setter: (value: string) => void) => {
    if (!value.trim()) return;

    const currentArray = formData[field] as string[];
    if (!currentArray.includes(value.trim())) {
      setFormData(prev => ({
        ...prev,
        [field]: [...currentArray, value.trim()]
      }));
    }
    setter('');
  };

  const removeItem = (field: keyof typeof formData, index: number) => {
    const currentArray = formData[field] as string[];
    setFormData(prev => ({
      ...prev,
      [field]: currentArray.filter((_, i) => i !== index)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent, field: keyof typeof formData, value: string, setter: (value: string) => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem(field, value, setter);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setMessage({ type: 'error', text: 'Project title is required' });
      return false;
    }
    if (!formData.category.trim()) {
      setMessage({ type: 'error', text: 'Project category is required' });
      return false;
    }
    if (!formData.description.trim()) {
      setMessage({ type: 'error', text: 'Short description is required' });
      return false;
    }
    if (formData.technologies.length === 0) {
      setMessage({ type: 'error', text: 'At least one technology is required' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Project created successfully!' });
        setTimeout(() => {
          router.push('/dashboard/projects');
        }, 1500);
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: errorData.error || 'Failed to create project' });
      }
    } catch (error) {
      console.error('Error creating project:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const SectionHeader: React.FC<{ title: string; section: keyof typeof expandedSections; isRequired?: boolean }> = ({ title, section, isRequired }) => (
    <div
      className="flex items-center justify-between cursor-pointer py-4 border-b border-gray-200 hover:bg-gray-50 px-2 rounded-lg transition-colors"
      onClick={() => toggleSection(section)}
    >
      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
        {title}
        {isRequired && <span className="text-red-500 text-sm">*</span>}
      </h2>
      {expandedSections[section] ? (
        <ChevronUp className="w-5 h-5 text-gray-500" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-500" />
      )}
    </div>
  );

  const ArrayInput: React.FC<{
    label: string;
    field: keyof typeof formData;
    value: string;
    setter: (value: string) => void;
    placeholder: string;
    items: string[];
    required?: boolean;
  }> = ({ label, field, value, setter, placeholder, items, required }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={value}
          onChange={(e) => setter(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, field, value, setter)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
          placeholder={placeholder}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => addItem(field, value, setter)}
          disabled={!value.trim() || isLoading}
          className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {items.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              {item}
              <button
                type="button"
                onClick={() => removeItem(field, index)}
                disabled={isLoading}
                className="ml-1 text-blue-600 hover:text-blue-800 disabled:opacity-50"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <p className="text-sm text-gray-500">{items.length} items added</p>
    </div>
  );

  if (isInitializing) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading form...</p>
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
            href="/dashboard/projects"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-gray-900 via-green-800 to-blue-800 bg-clip-text text-transparent">
              Add New Project
            </span>
          </h1>
          <p className="text-gray-600">Create a comprehensive project entry for your portfolio</p>
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
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="font-medium">{message.text}</span>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="relative z-10 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-3" />
                  <p className="text-gray-700 font-medium">Creating project...</p>
                </div>
              </div>
            )}
            {/* Basic Information */}
            <div className="p-8">
              <SectionHeader title="Basic Information" section="basic" isRequired />
              {expandedSections.basic && (
                <div className="space-y-6 mt-6">
                                    <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                        placeholder="Enter project title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                      >
                        <option value="">Select category</option>
                        <option value="Web Application">Web Application</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="Desktop Application">Desktop Application</option>
                        <option value="API/Backend">API/Backend</option>
                        <option value="Full Stack">Full Stack</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Icon <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="icon"
                        value={formData.icon}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                      >
                        <option value="code">💻 Code</option>
                        <option value="palette">🎨 Design</option>
                        <option value="star">⭐ Star</option>
                        <option value="zap">⚡ Lightning</option>
                      </select>
                      <div className="mt-2 flex gap-2">
                        {formData.icon === 'code' && <Code className="w-5 h-5 text-blue-500" />}
                        {formData.icon === 'palette' && <Palette className="w-5 h-5 text-purple-500" />}
                        {formData.icon === 'star' && <Star className="w-5 h-5 text-yellow-500" />}
                        {formData.icon === 'zap' && <Zap className="w-5 h-5 text-orange-500" />}
                        <span className="text-sm text-gray-600">Preview</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-none"
                      placeholder="Brief description of the project (2-3 sentences)"
                    />
                    <p className="text-sm text-gray-500 mt-1">{formData.description.length}/500 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
                    <textarea
                      name="fullDescription"
                      value={formData.fullDescription}
                      onChange={handleInputChange}
                      rows={5}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-none"
                      placeholder="Detailed description of the project, its purpose, and implementation details"
                    />
                    <p className="text-sm text-gray-500 mt-1">{formData.fullDescription.length}/2000 characters</p>
                  </div>
                </div>
              )}
            </div>

            {/* Project Details */}
            <div className="border-t border-gray-200 p-8">
              <SectionHeader title="Project Details" section="details" />
              {expandedSections.details && (
                <div className="space-y-6 mt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <ArrayInput
                      label="Technologies"
                      field="technologies"
                      value={newTechnology}
                      setter={setNewTechnology}
                      placeholder="Add a technology (e.g., React, Node.js)"
                      items={formData.technologies}
                      required
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                        placeholder="e.g., 3 months, 6 weeks"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Team</label>
                      <input
                        type="text"
                        name="team"
                        value={formData.team}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                        placeholder="e.g., Solo Developer, 3 Developers"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                      >
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Planning">Planning</option>
                        <option value="On Hold">On Hold</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                      <input
                        type="url"
                        name="github"
                        value={formData.github}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                        placeholder="https://github.com/username/project"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Demo URL</label>
                      <input
                        type="url"
                        name="demo"
                        value={formData.demo}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                        placeholder="https://project-demo.vercel.app"
                      />
                    </div>
                  </div>

                  <ArrayInput
                    label="Images"
                    field="images"
                    value={newImage}
                    setter={setNewImage}
                    placeholder="Add image URL (https://...)"
                    items={formData.images}
                  />

                  <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <input
                      type="checkbox"
                      name="published"
                      checked={formData.published}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="text-sm font-medium text-blue-900">
                      Publish this project to the public portfolio
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Technical Information */}
            <div className="border-t border-gray-200 p-8">
              <SectionHeader title="Technical Information" section="technical" />
              {expandedSections.technical && (
                <div className="space-y-6 mt-6">
                  <ArrayInput
                    label="Features"
                    field="features"
                    value={newFeature}
                    setter={setNewFeature}
                    placeholder="Add a feature (e.g., Responsive design, User authentication)"
                    items={formData.features}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Challenges Faced</label>
                    <textarea
                      value={formData.challenges.join('\n')}
                      onChange={(e) => {
                        const challenges = e.target.value.split('\n').map(item => item.trim()).filter(item => item.length > 0);
                        setFormData(prev => ({ ...prev, challenges }));
                      }}
                      disabled={isLoading}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-none"
                      placeholder="Technical challenges encountered (one per line)"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.challenges.length} challenges listed
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Solutions Implemented</label>
                    <textarea
                      value={formData.solutions.join('\n')}
                      onChange={(e) => {
                        const solutions = e.target.value.split('\n').map(item => item.trim()).filter(item => item.length > 0);
                        setFormData(prev => ({ ...prev, solutions }));
                      }}
                      disabled={isLoading}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-none"
                      placeholder="Solutions implemented for each challenge (one per line)"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.solutions.length} solutions listed
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Project Content */}
            <div className="border-t border-gray-200 p-8">
              <SectionHeader title="Project Content" section="content" />
              {expandedSections.content && (
                <div className="space-y-6 mt-6">
                  <ArrayInput
                    label="Objectives"
                    field="objectives"
                    value={newObjective}
                    setter={setNewObjective}
                    placeholder="Add an objective (e.g., Improve user experience)"
                    items={formData.objectives}
                  />

                  <ArrayInput
                    label="Results & Achievements"
                    field="results"
                    value={newResult}
                    setter={setNewResult}
                    placeholder="Add a result (e.g., Increased user engagement by 40%)"
                    items={formData.results}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          disabled={isLoading}
                          className="transition-colors disabled:opacity-50"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= formData.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {formData.rating}/5 stars
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Testimonial */}
            <div className="border-t border-gray-200 p-8">
              <SectionHeader title="Testimonial (Optional)" section="testimonial" />
              {expandedSections.testimonial && (
                <div className="space-y-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Testimonial Text</label>
                    <textarea
                      value={formData.testimonial.text}
                      onChange={(e) => handleTestimonialChange('text', e.target.value)}
                      rows={4}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-none"
                      placeholder="What someone said about this project"
                    />
                    <p className="text-sm text-gray-500 mt-1">{formData.testimonial.text.length}/500 characters</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
                      <input
                        type="text"
                        value={formData.testimonial.author}
                        onChange={(e) => handleTestimonialChange('author', e.target.value)}
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Author Role</label>
                      <input
                        type="text"
                        value={formData.testimonial.role}
                        onChange={(e) => handleTestimonialChange('role', e.target.value)}
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                        placeholder="Project Manager"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="border-t border-gray-200 p-8 bg-gray-50">
              <div className="flex justify-end gap-4">
                <Link
                  href="/dashboard/projects"
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
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Create Project
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

export default AddProjectPage;
