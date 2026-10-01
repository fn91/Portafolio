import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { FiExternalLink, FiGithub, FiBookOpen } from "react-icons/fi";
import { projects, projectCategories } from "../../data/projects";
import { fadeInUp, staggerContainer } from "../../animations";

export default function Projects() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const filtered = activeCategory === "Todos"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-32 relative bg-gray-50/50 dark:bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeInUp} className="mb-20">
            <span className="tag mb-6 inline-block">03</span>
            <h2 className="section-title text-left">
              <span className="gradient-text">{t("projects.title")}</span>
            </h2>
            <div className="w-20 h-[2px] bg-black dark:bg-white mt-6" />
            <p className="section-subtitle text-left mt-6 max-w-xl">
              {t("projects.subtitle")}
            </p>
          </motion.div>

          {/* Category filters */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-16">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.1em] font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white border border-black/10 dark:border-white/10"
                }`}
              >
                {t(`projects.categories.${cat}`, cat)}
              </button>
            ))}
          </motion.div>

          {/* Project cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-black/10 dark:bg-white/10">
            <AnimatePresence mode="wait">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-[#0a0a0a] group relative"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-[#141414]">
                    <img
                      src={project.image}
                      alt={`Vista previa de ${project.title}`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-6xl font-bold text-gray-200 dark:text-gray-800 opacity-50"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {project.title.split(" ").map((w) => w[0]).join("")}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-center justify-center gap-4">
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          aria-label={`${t("projects.demo")} - ${project.title}`}
                          className="w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                        >
                          <FiExternalLink size={18} aria-hidden="true" />
                        </motion.a>
                      )}
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          aria-label={`${t("projects.code")} - ${project.title}`}
                          className="w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                        >
                          <FiGithub size={18} aria-hidden="true" />
                        </motion.a>
                      )}
                      {project.caseStudy && (
                        <motion.a
                          href={project.caseStudy}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          aria-label={`${t("projects.caseStudy")} - ${project.title}`}
                          className="w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                        >
                          <FiBookOpen size={18} aria-hidden="true" />
                        </motion.a>
                      )}
                    </div>

                    {/* Status */}
                    <div className="absolute top-4 right-4">
                      <span className={`tag ${
                        project.status === "Completado"
                          ? "bg-black text-white dark:bg-white dark:text-black border-0"
                          : ""
                      }`}>
                        {project.status === "Completado" ? t("projects.completed") : t("projects.inDevelopment")}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3
                      className="text-xl font-bold mb-2 group-hover:text-primary transition-colors"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      {project.date}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
