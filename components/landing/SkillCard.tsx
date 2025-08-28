"use client"
import { Skill } from "@/types/portofolio";
import { useEffect, useState } from "react";

interface SkillCardProps {
  skill: Skill;
  delay: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, delay }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="group bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
          {skill.icon}
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-900">{skill.name}</h3>
          <p className="text-purple-600 text-sm">{skill.category}</p>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div 
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: isVisible ? `${skill.level}%` : '0%' }}
        />
      </div>
      <p className="text-right text-sm text-gray-600">{skill.level}%</p>
    </div>
  );
};
