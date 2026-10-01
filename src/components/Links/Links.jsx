import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { FiExternalLink, FiDownload, FiLinkedin } from "react-icons/fi";
import { SiGithub, SiVercel } from "react-icons/si";
import { personalInfo } from "../../data/personal";
import { fadeInUp, staggerContainer, scaleIn } from "../../animations";

export default function Links() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const links = [
    { icon: SiGithub, label: "GitHub", url: personalInfo.social.github },
    { icon: FiLinkedin, label: "LinkedIn", url: personalInfo.social.linkedin },
    { icon: SiVercel, label: "Vercel", url: personalInfo.social.vercel },
    { icon: FiExternalLink, label: t("links.portfolio"), url: "#hero" },
    { icon: FiDownload, label: t("links.cv"), url: "https://www.dropbox.com/scl/fi/1qlvermybaqxewuaxtrol/Claudio_FanelliRodriguez_CV_es-firmado.pdf?rlkey=in05b3ogo9jm9p31ydbmki1p1&st=3pmq08mc&dl=1" },
    { icon: FiExternalLink, label: t("links.blog"), url: "#blog" },
  ];

  return (
    <section id="links" className="py-24 relative bg-gray-50/50 dark:bg-[#0f0f0f]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8" ref={ref}>
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
              <span className="gradient-text">{t("links.title")}</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {t("links.subtitle")}
            </p>
          </motion.div>

          {/* Desktop: grid */}
          <div className="hidden sm:grid grid-cols-3 lg:grid-cols-6 gap-[1px] bg-black/10 dark:bg-white/10">
            {links.map((link) => (
              <motion.a
                key={link.label}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                variants={scaleIn}
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-[#0a0a0a] p-5 flex flex-col items-center gap-2 text-center group hover:bg-gray-50 dark:hover:bg-[#141414] transition-colors"
              >
                <div className="w-10 h-10 border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                  <link.icon size={16} />
                </div>
                <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-gray-600 dark:text-gray-300">
                  {link.label}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Mobile: stacked */}
          <div className="sm:hidden space-y-[1px] bg-black/10 dark:bg-white/10">
            {links.map((link) => (
              <motion.a
                key={link.label}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                variants={scaleIn}
                whileHover={{ x: 4 }}
                className="bg-white dark:bg-[#0a0a0a] px-5 py-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-[#141414] transition-colors"
              >
                <div className="w-9 h-9 border border-black/10 dark:border-white/10 flex items-center justify-center flex-shrink-0">
                  <link.icon size={16} />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {link.label}
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
