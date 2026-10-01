import type { ComponentType, SVGProps } from "react";

export interface PersonalInfo {
  name: string;
  title: string;
  avatar: string;
  email: string;
  phone: string;
  location: {
    city: string;
    country: string;
    address: string;
  };
  schedule: string;
  bio: string;
  longBio: string;
  philosophy: string;
  goals: string[];
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    facebook: string;
    youtube: string;
    tiktok: string;
    discord: string;
  };
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

export interface Technology {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  level: number;
  color: string;
  category: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  status: string;
  date: string;
  demo?: string;
  github?: string;
  caseStudy?: string;
  featured?: boolean;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  location: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  duration: string;
  description: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Skill {
  name: string;
  level: number;
  color: string;
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  opinion: string;
  rating: number;
  avatar: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
  slug: string;
}
