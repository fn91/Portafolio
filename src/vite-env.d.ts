declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "../../context/ThemeContext" {
  export function ThemeProvider({ children }: { children: React.ReactNode }): JSX.Element;
  export function useTheme(): { isDark: boolean; toggleTheme: () => void };
}

declare module "../../hooks/useScroll" {
  export function useScrollProgress(): number;
  export function useActiveSection(sectionIds: string[]): string;
  export function useLocalStorage(key: string, initialValue: unknown): [unknown, (value: unknown) => void];
}

declare module "../../data/personal" {
  export const personalInfo: {
    name: string;
    title: string;
    avatar: string;
    email: string;
    phone: string;
    location: { city: string; country: string; address: string };
    schedule: string;
    bio: string;
    longBio: string;
    philosophy: string;
    goals: string[];
    social: Record<string, string>;
  };
  export const stats: Array<{
    label: string;
    value: number;
    suffix: string;
    icon: string;
  }>;
}

declare module "../../data/technologies" {
  import { ComponentType, SVGProps } from "react";
  export const technologies: Array<{
    name: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    level: number;
    color: string;
    category: string;
  }>;
  export const categories: string[];
}

declare module "../../data/projects" {
  export const projects: Array<{
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
  }>;
  export const projectCategories: string[];
}

declare module "../../data/experience" {
  export const experience: Array<{
    id: number;
    company: string;
    role: string;
    duration: string;
    location: string;
    responsibilities: string[];
    achievements: string[];
    technologies: string[];
  }>;
  export const education: Array<{
    id: number;
    institution: string;
    degree: string;
    duration: string;
    description: string;
  }>;
}

declare module "../../data/content" {
  export const services: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
    features: string[];
  }>;
  export const skills: Array<{
    name: string;
    level: number;
    color: string;
  }>;
  export const testimonials: Array<{
    id: number;
    name: string;
    company: string;
    role: string;
    opinion: string;
    rating: number;
    avatar: string;
  }>;
  export const blogPosts: Array<{
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    image: string;
    readTime: string;
    slug: string;
  }>;
}
