import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { testimonials } from "../../data/content";
import { fadeInUp, staggerContainer } from "../../animations";

export default function Testimonials() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-32 relative" aria-label={t("testimonials.title")}>
      <div className="divider" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeInUp} className="mb-20">
            <span className="tag mb-6 inline-block">08</span>
            <h2 className="section-title text-left">
              {t("testimonials.title")}
            </h2>
            <div className="w-20 h-[2px] bg-black dark:bg-white mt-6" />
            <p className="section-subtitle text-left mt-6 max-w-xl">
              {t("testimonials.subtitle")}
            </p>
          </motion.div>

          {/* Carousel */}
          <div className="max-w-3xl">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="border border-black/5 dark:border-white/5 p-10 md:p-14 relative bg-gray-50/50 dark:bg-[#141414]"
              aria-live="polite"
              aria-atomic="true"
            >
              {/* Quote mark */}
              <div
                className="absolute top-6 left-8 text-7xl text-gray-200 dark:text-gray-800 leading-none"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                aria-hidden="true"
              >
                "
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-8" aria-label={`${testimonials[current].rating} de 5 estrellas`}>
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <FiStar key={i} size={14} className="fill-black dark:fill-white text-black dark:text-white" aria-hidden="true" />
                ))}
              </div>

              {/* Opinion */}
              <p className="text-lg text-gray-600 dark:text-gray-300 italic mb-10 leading-relaxed">
                &ldquo;{testimonials[current].opinion}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-sm"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  aria-hidden="true"
                >
                  {testimonials[current].name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{testimonials[current].name}</h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {testimonials[current].role} · {testimonials[current].company}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center gap-6 mt-10" role="group" aria-label={t("testimonials.title")}>
              <button
                onClick={prev}
                aria-label={t("testimonials.prev")}
                className="w-10 h-10 border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all hover:scale-105 active:scale-95"
              >
                <FiChevronLeft size={16} aria-hidden="true" />
              </button>

              <div className="flex gap-2" role="tablist" aria-label={t("testimonials.title")}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`${t("testimonials.goTo")} ${i + 1}`}
                    className={`h-[2px] transition-all duration-300 ${
                      i === current
                        ? "w-8 bg-black dark:bg-white"
                        : "w-4 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label={t("testimonials.next")}
                className="w-10 h-10 border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all hover:scale-105 active:scale-95"
              >
                <FiChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
