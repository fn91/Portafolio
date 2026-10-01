import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { personalInfo } from "../../data/personal";
import { fadeInUp, staggerContainer, fadeInLeft, fadeInRight } from "../../animations";

export default function About() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="py-32 relative">
      <div className="divider" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeInUp} className="mb-20">
            <span className="tag mb-6 inline-block">01</span>
            <h2 className="section-title text-left">
              {t("about.title")} <span className="gradient-text">{t("about.title").split(" ").pop()}</span>
            </h2>
            <div className="w-20 h-[2px] bg-black dark:bg-white mt-6" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: Visual */}
            <motion.div variants={fadeInLeft} className="relative">
              <div className="aspect-[4/5] bg-gray-100 dark:bg-[#141414] relative overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className="text-8xl font-bold text-gray-200 dark:text-gray-800 mb-4"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {personalInfo.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <span className="text-xs uppercase tracking-[0.3em] text-gray-400 dark:text-gray-600">
                    {personalInfo.title.split("|")[0].trim()}
                  </span>
                </div>
              </div>
              {/* Corner lines */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-black/20 dark:border-white/20" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-black/20 dark:border-white/20" />
            </motion.div>

            {/* Right: Text */}
            <motion.div variants={fadeInRight}>
              <h3
                className="text-3xl font-bold mb-6 leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Front-End Developer
                <br />
                <span className="text-gray-400 dark:text-gray-600">{t("personal.aboutSubtitle")}</span>
              </h3>

              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8 text-base whitespace-pre-line">
                {t("personal.longBio")}
              </p>

              <div className="mb-8">
                <h4 className="text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-3">
                  {t("about.philosophy")}
                </h4>
                <blockquote className="pl-4 border-l-2 border-black dark:border-white text-gray-600 dark:text-gray-300">
                  &ldquo;{t("personal.philosophy")}&rdquo;
                </blockquote>
              </div>

              <div className="mb-10">
                <h4 className="text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4">
                  {t("about.goals")}
                </h4>
                <ul className="space-y-3">
                  {t("personal.goals", { returnObjects: true }).map((goal, i) => (
                    <motion.li
                      key={i}
                      variants={fadeInUp}
                      className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm"
                    >
                      <span className="mt-1.5 w-1 h-1 bg-black dark:bg-white flex-shrink-0" />
                      {goal}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Lo que aporto */}
              <div className="mb-10">
                <h4 className="text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4">
                  {t("personal.whatIOffer")}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {t("personal.offerItems", { returnObjects: true }).map((item, i) => (
                    <div key={i} className="p-4 border border-black/5 dark:border-white/5">
                      <p className="font-medium text-sm mb-1">{item.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-[1px] bg-black/10 dark:bg-white/10">
                {[
                  { label: t("stats.projects"), value: "6" },
                  { label: t("stats.clients"), value: "0" },
                  { label: t("stats.years"), value: "DAM" },
                  { label: t("stats.techs"), value: "10+" },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    className="p-6 bg-white dark:bg-[#0a0a0a] text-center"
                  >
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
