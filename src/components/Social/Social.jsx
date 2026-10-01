import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import {
  SiGithub, SiVercel,
} from "react-icons/si";
import { FiMail, FiLinkedin } from "react-icons/fi";
import { personalInfo } from "../../data/personal";
import { fadeInUp, staggerContainer, scaleIn } from "../../animations";

const socialLinks = [
  { icon: SiGithub, label: "GitHub", url: personalInfo.social.github },
  { icon: FiLinkedin, label: "LinkedIn", url: personalInfo.social.linkedin },
  { icon: SiVercel, label: "Vercel", url: personalInfo.social.vercel },
  { icon: FiMail, label: "Email", url: `mailto:${personalInfo.email}` },
].filter((link) => link.url && link.url.length > 0);

export default function Social() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {t("social.title")}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {t("social.subtitle")}
            </p>
          </motion.div>

          {/* Desktop: grid layout */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-black/10 dark:bg-white/10">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={scaleIn}
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-[#0a0a0a] p-6 flex flex-col items-center gap-3 hover:bg-gray-50 dark:hover:bg-[#141414] transition-colors text-center"
              >
                <div className="w-12 h-12 border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                  <social.icon size={20} className="text-gray-600 dark:text-gray-300" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Mobile: stacked layout */}
          <div className="sm:hidden space-y-[1px] bg-black/10 dark:bg-white/10">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={scaleIn}
                whileHover={{ x: 4 }}
                className="bg-white dark:bg-[#0a0a0a] px-6 py-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-[#141414] transition-colors"
              >
                <div className="w-10 h-10 border border-black/10 dark:border-white/10 flex items-center justify-center flex-shrink-0">
                  <social.icon size={18} className="text-gray-600 dark:text-gray-300" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {social.label}
                </span>
                <span className="ml-auto text-gray-400 dark:text-gray-500 text-xs">
                  →
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
