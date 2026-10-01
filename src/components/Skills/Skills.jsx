import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { fadeInUp, staggerContainer, fadeInLeft } from "../../animations";

export default function Skills() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const skills = t("skills.items", { returnObjects: true });

  return (
    <section id="skills" className="py-32 relative">
      <div className="divider" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeInUp} className="mb-20">
            <span className="tag mb-6 inline-block">06</span>
            <h2 className="section-title text-left">
              <span className="gradient-text">{t("skills.title")}</span>
            </h2>
            <div className="w-20 h-[2px] bg-black dark:bg-white mt-6" />
            <p className="section-subtitle text-left mt-6 max-w-xl">
              {t("skills.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                variants={fadeInLeft}
                className="group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-sm">{skill.name}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-[2px] bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }}
                    className="h-full bg-black dark:bg-white"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Minimalist radar visual */}
          <motion.div variants={fadeInUp} className="mt-20 flex justify-center">
            <div className="relative w-64 h-64">
              {[100, 75, 50, 25].map((size) => (
                <div
                  key={size}
                  className="absolute border border-black/5 dark:border-white/5"
                  style={{
                    width: `${size}%`,
                    height: `${size}%`,
                    top: `${(100 - size) / 2}%`,
                    left: `${(100 - size) / 2}%`,
                  }}
                />
              ))}
              {skills.slice(0, 8).map((skill, i) => {
                const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
                const radius = (skill.level / 100) * 42;
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="absolute w-2 h-2 bg-black dark:bg-white -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                    }}
                    title={`${skill.name}: ${skill.level}%`}
                  />
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
