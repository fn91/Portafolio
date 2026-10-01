import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { staggerContainer, scaleIn } from "../../animations";

function CountUp({ target, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const statsData = [
    { labelKey: "stats.projects", value: 6, suffix: "+", icon: "📁" },
    { labelKey: "stats.techs", value: 10, suffix: "+", icon: "💻" },
    { labelKey: "stats.education", value: 2, suffix: "", icon: "📅" },
    { labelKey: "stats.certs", value: 2, suffix: "+", icon: "⚡" },
    { labelKey: "stats.repos", value: 10, suffix: "+", icon: "🔀" },
    { labelKey: "stats.languages", value: 3, suffix: "", icon: "👥" },
  ];

  return (
    <section id="stats" className="py-24 relative bg-gray-50/50 dark:bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[1px] bg-black/10 dark:bg-white/10">
            {statsData.map((stat) => (
              <motion.div
                key={stat.labelKey}
                variants={scaleIn}
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                className="bg-white dark:bg-[#0a0a0a] p-8 text-center"
              >
                <div className="text-2xl mb-3">{stat.icon}</div>
                <div
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500">
                  {t(stat.labelKey)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
