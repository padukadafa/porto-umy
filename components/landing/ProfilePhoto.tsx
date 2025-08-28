"use client"
import React, { useState, useEffect } from 'react';
import { User, X } from "lucide-react";

interface ProfileData {
  name: string;
  description: string;
  profileImage?: string;
}

export const ProfilePhoto: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Profile data - customize this with your information
  const profileData: ProfileData = {
    name: "John Developer",
    description: "I'm a passionate full-stack developer with a love for creating immersive digital experiences. My journey began with curiosity about how websites work, and it has evolved into a deep appreciation for clean code, beautiful design, and innovative technologies. I specialize in React, Next.js, and 3D web experiences using Spline and Three.js.",
    // profileImage: "/path/to/your/photo.jpg" // Uncomment and add your photo path
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoaded(true);
    } else {
      document.body.style.overflow = 'unset';
      setIsLoaded(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handlePhotoClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isModalOpen]);

  return (
    <>
      {/* Profile Photo - Original Design */}
      <div 
        className="relative w-32 h-32 mx-auto mb-6 cursor-pointer group"
        onClick={handlePhotoClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handlePhotoClick();
          }
        }}
        aria-label="View profile details"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse group-hover:animate-none transition-all duration-300"></div>
        <div className="relative w-full h-full bg-gray-200 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300">
          {profileData.profileImage ? (
            <img 
              src={profileData.profileImage}
              alt="John Developer Profile Photo"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <User className="w-16 h-16 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
          )}
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-sm font-medium px-2 text-center">
              Click to view profile
            </span>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 "
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <div className={`
            relative bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl
            transform transition-all duration-500 max-h-[90vh] overflow-y-auto
            ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
          `}>
            
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg group"
              aria-label="Close profile"
            >
              <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
            </button>

            {/* Card Content */}
            <div className="p-8 text-center">
              
              {/* Large Profile Photo */}
              <div className="relative mb-6">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
                  {profileData.profileImage ? (
                    <img 
                      src={profileData.profileImage}
                      alt="John Developer Profile Photo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <User className="w-20 h-20 text-purple-400" />
                    </div>
                  )}
                </div>
                {/* Decorative Ring */}
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full -z-10"></div>
              </div>

              {/* Name */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {profileData.name}
              </h2>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-sm mb-6">
                {profileData.description}
              </p>

              {/* Optional CTA Button */}
              <button 
                onClick={closeModal}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Let's Connect
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
};