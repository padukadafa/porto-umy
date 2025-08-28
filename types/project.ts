export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  images: string[];
  github?: string;
  demo?: string;
  rating: number;
  icon: React.ReactNode;
  duration: string;
  team: string;
  status: string;
  challenges: string[];
  solutions: string[];
  features: string[];
  objectives: string[];
  results: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
}