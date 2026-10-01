import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const tools = [
  {
    category: "Editor",
    items: [
      { name: "VS Code", description: "Editor principal con tema One Dark Pro" },
      { name: "Cursor", description: "IDE con IA integrada para coding rápido" },
    ],
  },
  {
    category: "Terminal",
    items: [
      { name: "Warp", description: "Terminal moderna con AI" },
      { name: "Oh My Zsh", description: "Framework de configuración de Zsh" },
    ],
  },
  {
    category: "Browser",
    items: [
      { name: "Arc", description: "Navegador principal" },
      { name: "Chrome DevTools", description: "Debugging y performance" },
    ],
  },
  {
    category: "Diseño",
    items: [
      { name: "Figma", description: "Diseño de interfaces y prototipos" },
      { name: "Excalidraw", description: "Bocetos y diagramas" },
    ],
  },
  {
    category: "DevOps",
    items: [
      { name: "Docker", description: "Containerización de servicios" },
      { name: "Vercel", description: "Deploy y hosting" },
      { name: "GitHub Actions", description: "CI/CD pipelines" },
    ],
  },
  {
    category: "Hardware",
    items: [
      { name: "MacBook Pro M3", description: "16GB RAM, 512GB SSD" },
      { name: "Dell UltraSharp 27\"", description: "Monitor 4K principal" },
      { name: "Keychron Q1", description: "Teclado mecánico custom" },
      { name: "Logitech MX Master 3S", description: "Ratón inalámbrico" },
    ],
  },
];

export function UsesPage() {
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
          <span className="tag mb-6 inline-block">USES</span>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Qué <span className="text-gray-300 dark:text-gray-700">uso</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-12">
            Herramientas, hardware y software que uso en mi día a día.
          </p>
        </motion.div>

        <div className="space-y-16">
          {tools.map((section, sectionIndex) => (
            <motion.section
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (sectionIndex + 1) }}
            >
              <h2
                className="text-xl font-bold mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.name} className="flex items-start gap-4 p-4 border border-black/5 dark:border-white/5">
                    <span className="w-1.5 h-1.5 bg-black dark:bg-white mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-sm">{item.name}</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-black/5 dark:border-white/5"
        >
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Inspirado en <a href="https://uses.tech" target="_blank" rel="noopener noreferrer" className="underline hover:text-black dark:hover:text-white">uses.tech</a> de Wes Bos.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
