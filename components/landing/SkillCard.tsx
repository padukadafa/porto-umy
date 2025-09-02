"use client"
import { Skill } from "@/types/portofolio";

interface SkillCardProps {
  skill: Skill;
  delay: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, delay }) => {

  return (
    <div className="group bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
          {skill.icon}
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-900">{skill.name}</h3>
          <p className="text-purple-600 text-sm">{skill.category}</p>
        </div>
      </div>
    </div>
  );
};
