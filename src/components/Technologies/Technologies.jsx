import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { technologies, categories } from "../../data/technologies";
import { fadeInUp, staggerContainer, scaleIn } from "../../animations";

export default function Technologies() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = activeCategory === "Todos"
    ? technologies
    : technologies.filter((tech) => tech.category === activeCategory);

  return (
    <section id="technologies" className="py-32 relative">
      <div className="divider" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeInUp} className="mb-20">
            <span className="tag mb-6 inline-block">02</span>
            <h2 className="section-title text-left">
              <span className="gradient-text">{t("technologies.title")}</span>
            </h2>
            <div className="w-20 h-[2px] bg-black dark:bg-white mt-6" />
            <p className="section-subtitle text-left mt-6 max-w-xl">
              {t("technologies.subtitle")}
            </p>
          </motion.div>

          {/* Category filters */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.1em] font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white border border-black/10 dark:border-white/10"
                }`}
              >
                {t(`technologies.categories.${cat}`, cat)}
              </button>
            ))}
          </motion.div>

          {/* Technology grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[1px] bg-black/10 dark:bg-white/10">
            {filtered.map((tech) => (
              <motion.div
                key={tech.name}
                layout
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02, zIndex: 10 }}
                className="bg-white dark:bg-[#0a0a0a] p-6 text-center cursor-pointer group relative"
              >
                <div
                  className="text-3xl mb-3 flex justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: tech.color }}
                >
                  <tech.icon size={32} />
                </div>
                <h3 className="font-medium text-sm mb-3">{tech.name}</h3>
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${tech.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 block uppercase tracking-wider">
                  {tech.level}%
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
