import React from 'react';

interface SectionProps {
  id: string;
  title?: string;
  kicker?: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ 
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
