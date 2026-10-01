import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { experience, education } from "../../data/experience";
import { fadeInUp, staggerContainer, fadeInLeft } from "../../animations";

export default function Experience() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="experience" className="py-32 relative">
      <div className="divider" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeInUp} className="mb-20">
            <span className="tag mb-6 inline-block">04</span>
            <h2 className="section-title text-left">
              {t("experience.title")} <span className="gradient-text"></span>
            </h2>
            <div className="w-20 h-[2px] bg-black dark:bg-white mt-6" />
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-black/10 dark:bg-white/10" />

            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                variants={fadeInUp}
                className={`relative flex flex-col md:flex-row gap-8 mb-16 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-black dark:bg-white z-10" />

                {/* Content card */}
                <div className={`flex-1 ml-8 md:ml-0 ${i % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="bg-gray-50/50 dark:bg-[#141414] border border-black/5 dark:border-white/5 p-8"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-6">
                      <div>
                        <h3
                          className="text-xl font-bold mb-1"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {exp.role}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="tag">
                          {exp.duration}
                        </span>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                          {exp.location}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-3">
                        {t("experience.responsibilities")}
                      </h4>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="mt-1.5 w-1 h-1 bg-black dark:bg-white flex-shrink-0" />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-3">
                        {t("experience.achievements")}
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((ach, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="mt-1.5 w-1 h-1 bg-black dark:bg-white flex-shrink-0" />
                            {ach}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education */}
          <motion.div variants={fadeInUp} className="mt-32">
            <h3
              className="text-2xl font-bold mb-12"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {t("experience.education")}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-black/10 dark:bg-white/10">
              {education.map((edu) => (
                <motion.div
                  key={edu.id}
                  variants={fadeInLeft}
                  whileHover={{ y: -2 }}
                  className="bg-white dark:bg-[#0a0a0a] p-8"
                >
                  <div className="w-10 h-10 border border-black/10 dark:border-white/10 flex items-center justify-center mb-4 text-lg">
                    🎓
                  </div>
                  <h4
                    className="font-bold mb-1"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {edu.degree}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {edu.institution}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-3">
                    {edu.duration}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
