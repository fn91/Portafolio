import {
  SiReact, SiJavascript, SiHtml5, SiCss,
  SiTailwindcss, SiAstro, SiPython,
  SiGit, SiFigma, SiVercel,
} from "react-icons/si";

export const technologies = [
  { name: "React", icon: SiReact, level: 85, color: "#61DAFB", category: "Frontend" },
  { name: "JavaScript", icon: SiJavascript, level: 82, color: "#F7DF1E", category: "Frontend" },
  { name: "HTML5", icon: SiHtml5, level: 95, color: "#E34F26", category: "Frontend" },
  { name: "CSS3", icon: SiCss, level: 90, color: "#1572B6", category: "Frontend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, level: 88, color: "#06B6D4", category: "Estilos" },
  { name: "Astro", icon: SiAstro, level: 75, color: "#FF5D01", category: "Frameworks" },
  { name: "Python", icon: SiPython, level: 65, color: "#3776AB", category: "Backend" },
  { name: "Git", icon: SiGit, level: 80, color: "#F05032", category: "Herramientas" },
  { name: "Figma", icon: SiFigma, level: 72, color: "#F24E1E", category: "Diseño" },
  { name: "Vercel", icon: SiVercel, level: 85, color: "#000000", category: "Deploy" },
];

export const categories = ["Todos", "Frontend", "Estilos", "Frameworks", "Backend", "Herramientas", "Diseño", "Deploy"];
