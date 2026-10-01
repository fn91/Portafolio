import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { FiClock, FiArrowRight } from "react-icons/fi";
import { fadeInUp, staggerContainer, scaleIn } from "../../animations";

export default function Blog() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const blogPosts = t("blog.items", { returnObjects: true });

  return (
    <section id="blog" className="py-32 relative bg-gray-50/50 dark:bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeInUp} className="mb-20">
            <span className="tag mb-6 inline-block">07</span>
            <h2 className="section-title text-left">
              {t("blog.title")}
            </h2>
            <div className="w-20 h-[2px] bg-black dark:bg-white mt-6" />
            <p className="section-subtitle text-left mt-6 max-w-xl">
              {t("blog.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-black/10 dark:bg-white/10">
            {blogPosts.map((post, i) => (
              <motion.article
                key={i}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0a0a] group cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-[#141414]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl text-gray-200 dark:text-gray-800">📝</span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="tag bg-black text-white dark:bg-white dark:text-black border-0">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <FiClock size={10} />
                      {post.readTime}
                    </span>
                  </div>

                  <h3
                    className="font-bold mb-2 group-hover:opacity-70 transition-opacity line-clamp-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-5">
                    {post.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.1em] group-hover:gap-2 transition-all">
                    {t("blog.readMore")} <FiArrowRight size={12} />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
