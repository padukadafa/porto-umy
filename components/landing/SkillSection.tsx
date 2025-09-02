import { Code, Palette, Zap } from "lucide-react";
import { Section } from "../Section";
import { SkillCard } from "./SkillCard";
import { Skill } from "@/types/portofolio";
import { Profile } from "@/types/profile";

interface SkillSectionProps {
  profile?: Profile;
}

const SkillSection: React.FC<SkillSectionProps> = ({ profile }) => {
  // Default skills if no profile data
  const defaultSkills: Skill[] = [
    { 
      name: "TypeScript/JavaScript", 
      category: "Programming", 
      level: 90, 
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
      level: 90, 
      icon: <Palette className="w-5 h-5" /> 
    },
    { 
      name: "Node.js/Express", 
      category: "Backend", 
      level: 90, 
      icon: <Code className="w-5 h-5" /> 
    },
    { 
      name: "UI/UX Design", 
      category: "Design", 
      level: 90, 
      icon: <Palette className="w-5 h-5" /> 
    },
    { 
      name: "Three.js/WebGL", 
      category: "3D Development", 
      level: 90, 
      icon: <Zap className="w-5 h-5" /> 
    }
  ];

  // Generate skills from profile data
  const skills: Skill[] = profile?.skills && profile.skills.length > 0 
    ? profile.skills.map((skillName, index) => {
        // Determine category and icon based on skill name
        let category = "Technology";
        let icon = <Code className="w-5 h-5" />;
        
        const skillLower = skillName.toLowerCase();
        
        if (skillLower.includes('react') || skillLower.includes('next') || skillLower.includes('vue') || skillLower.includes('angular') || skillLower.includes('frontend') || skillLower.includes('javascript') || skillLower.includes('typescript') || skillLower.includes('html') || skillLower.includes('css')) {
          category = "Frontend";
          icon = <Zap className="w-5 h-5" />;
        } else if (skillLower.includes('node') || skillLower.includes('express') || skillLower.includes('python') || skillLower.includes('java') || skillLower.includes('php') || skillLower.includes('backend') || skillLower.includes('database') || skillLower.includes('sql') || skillLower.includes('mongodb') || skillLower.includes('postgresql')) {
          category = "Backend";
          icon = <Code className="w-5 h-5" />;
        } else if (skillLower.includes('design') || skillLower.includes('ui') || skillLower.includes('ux') || skillLower.includes('figma') || skillLower.includes('photoshop') || skillLower.includes('illustrator') || skillLower.includes('sketch')) {
          category = "Design";
          icon = <Palette className="w-5 h-5" />;
        } else if (skillLower.includes('3d') || skillLower.includes('spline') || skillLower.includes('three') || skillLower.includes('webgl') || skillLower.includes('blender') || skillLower.includes('maya')) {
          category = "3D Development";
          icon = <Zap className="w-5 h-5" />;
        } else if (skillLower.includes('mobile') || skillLower.includes('react native') || skillLower.includes('flutter') || skillLower.includes('ios') || skillLower.includes('android')) {
          category = "Mobile";
          icon = <Code className="w-5 h-5" />;
        } else if (skillLower.includes('devops') || skillLower.includes('docker') || skillLower.includes('kubernetes') || skillLower.includes('aws') || skillLower.includes('azure') || skillLower.includes('cloud')) {
          category = "DevOps";
          icon = <Code className="w-5 h-5" />;
        }
        
        return {
          name: skillName,
          category,
          level: 90, // Default level, not displayed
          icon
        };
      })
    : defaultSkills;
    return ( <Section id="skills" title="Keahlian & Expertise" kicker="Yang Saya Lakukan">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} delay={index * 100} />
          ))}
        </div>
      </Section> );
}
 
export default SkillSection;