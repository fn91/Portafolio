import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const currentStack = [
  { name: "React 19", description: "Frontend framework principal" },
  { name: "TypeScript", description: "Type safety en todo el proyecto" },
  { name: "Tailwind CSS v4", description: "Estilos utility-first" },
  { name: "Vite 8", description: "Build tool ultrarrápido" },
  { name: "Framer Motion", description: "Animaciones declarativas" },
  { name: "GSAP", description: "Animaciones premium" },
];

const activeProjects = [
  {
    name: "Portfolio v2",
    description: "Modernización completa del portafolio personal",
    status: "En progreso",
  },
  {
    name: "AI Dashboard",
    description: "Panel de administración con IA integrada",
    status: "En desarrollo",
  },
];

const learning = [
  "React Server Components",
  "Three.js / React Three Fiber",
  "WebGL y shaders",
  "Sistemas de diseño avanzados",
];

const reading = [
  "Designing Data-Intensive Applications - Martin Kleppmann",
  "The Pragmatic Programmer - Hunt & Thomas",
  "Refactoring UI - Adam Wathan & Steve Schoger",
];

export function NowPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-16"
          >
            <FiArrowLeft size={14} />
            Volver al portafolio
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="tag mb-6 inline-block">NOW</span>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Qué estoy haciendo <span className="text-gray-300 dark:text-gray-700">ahora</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-12">
            Última actualización: Julio 2026
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* Current Stack */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2
              className="text-xl font-bold mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Stack actual
            </h2>
            <div className="space-y-4">
              {currentStack.map((item) => (
                <div key={item.name} className="flex items-start gap-4 p-4 border border-black/5 dark:border-white/5">
                  <span className="w-1.5 h-1.5 bg-black dark:bg-white mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-sm">{item.name}</span>
                    <span className="text-gray-400 dark:text-gray-500 text-sm ml-2">— {item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Active Projects */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2
              className="text-xl font-bold mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Proyectos activos
            </h2>
            <div className="space-y-4">
              {activeProjects.map((project) => (
                <div key={project.name} className="p-4 border border-black/5 dark:border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{project.name}</span>
                    <span className="tag text-[9px]">{project.status}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{project.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Learning */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2
              className="text-xl font-bold mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Aprendiendo
            </h2>
            <ul className="space-y-3">
              {learning.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-1 h-1 bg-black dark:bg-white" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Reading */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2
              className="text-xl font-bold mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Leyendo
            </h2>
            <ul className="space-y-3">
              {reading.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-1 h-1 bg-black dark:bg-white" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
