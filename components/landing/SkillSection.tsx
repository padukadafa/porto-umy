import { Code, Palette, Zap } from "lucide-react";
import { Section } from "../Section";
import { SkillCard } from "./SkillCard";
import { Skill } from "@/types/portofolio";
const skills: Skill[] = [
    { 
      name: "TypeScript/JavaScript", 
      category: "Programming", 
      level: 95, 
      icon: <Code className="w-5 h-5" /> 
    },
    { 
      name: "React/Next.js", 
      category: "Frontend", 
      level: 90, 
      icon: <Zap className="w-5 h-5" /> 
    },
    { 
      name: "3D Design (Spline)", 
      category: "Creative", 
      level: 85, 
      icon: <Palette className="w-5 h-5" /> 
    },
    { 
      name: "Node.js/Express", 
      category: "Backend", 
      level: 80, 
      icon: <Code className="w-5 h-5" /> 
    },
    { 
      name: "UI/UX Design", 
      category: "Design", 
      level: 88, 
      icon: <Palette className="w-5 h-5" /> 
    },
    { 
      name: "Three.js/WebGL", 
      category: "3D Development", 
      level: 75, 
      icon: <Zap className="w-5 h-5" /> 
    }
  ];
const SkillSection = () => {
    return ( <Section id="skills" title="Skills & Expertise" kicker="What I Do">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} delay={index * 100} />
          ))}
        </div>
      </Section> );
}
 
export default SkillSection;