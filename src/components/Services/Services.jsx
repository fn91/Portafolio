import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { fadeInUp, staggerContainer, scaleIn } from "../../animations";

const iconMap = {
  0: "💻",
  1: "◻",
  2: "📊",
  3: "□",
  4: "◎",
  5: "⟡",
};

export default function Services() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const services = t("services.items", { returnObjects: true });

  return (
    <section id="services" className="py-32 relative">
      <div className="divider" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeInUp} className="mb-20">
            <span className="tag mb-6 inline-block">05</span>
            <h2 className="section-title text-left">
              <span className="gradient-text">{t("services.title")}</span>
            </h2>
            <div className="w-20 h-[2px] bg-black dark:bg-white mt-6" />
            <p className="section-subtitle text-left mt-6 max-w-xl">
              {t("services.subtitle")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-black/10 dark:bg-white/10">
            {services.map((service, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0a0a] p-8 group cursor-pointer relative"
              >
                <div className="mb-6">
                  <div className="w-12 h-12 border border-black/10 dark:border-white/10 flex items-center justify-center text-xl group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
                    {iconMap[i] || "◆"}
                  </div>
                </div>

                <h3
                  className="text-lg font-bold mb-3"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                  {service.desc}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="w-1 h-1 bg-black dark:bg-white" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
