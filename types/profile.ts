export interface Profile {
  id: string;
  name: string;
  title: string;
  description: string;
  bio: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  resume: string;
  skills: string[];
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    description: string;
  }>;
  certificates: Array<{
    name: string;
    issuer: string;
    date: string;
    description: string;
    url?: string;
  }>;
  languages: string[];
  experience: string;
  availability: string;
}
