import { useState, useEffect } from "react";
import { HiDownload, HiMail, HiOutlineChevronDown } from "react-icons/hi";
import { personalInfo } from "../../data/personal";
import { useTranslation } from "react-i18next";

const titles = ["Front-End Developer", "React Developer", "UI Developer"];

function TypeWriter() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const timeout = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentTitle.length) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
      return;
    }

    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, timeout);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, titleIndex]);

  return (
    <span className="text-lg text-gray-500 dark:text-gray-400">
      {titles[titleIndex].slice(0, charIndex)}
      <span className="inline-block w-[2px] h-[1em] bg-current ml-0.5 animate-pulse" />
    </span>
  );
}

export default function Hero() {
  const { t } = useTranslation();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center">
      {/* Subtle grid background */}
      <div className="hero-grid" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 animate-[fadeIn_0.6s_ease-out]">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left animate-[slideInLeft_0.6s_ease-out_0.1s_both]">
            <div className="mb-8 animate-[fadeIn_0.6s_ease-out_0.2s_both]">
              <span className="tag">{t("hero.available")}</span>
            </div>

            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8 animate-[fadeInUp_0.6s_ease-out_0.3s_both]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.04em' }}
            >
              {t("hero.greeting")}
              <br />
              <span className="text-gray-300 dark:text-gray-700">{personalInfo.name.split(" ")[0]}</span>
              <span className="mx-3 text-gray-300 dark:text-gray-700">·</span>
              <span className="gradient-text">{personalInfo.name.split(" ")[1]}</span>
              <span className="mx-3 gradient-text">·</span>
              <span className="gradient-text">{personalInfo.name.split(" ")[2]}</span>
            </h1>

            <div className="mb-8 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
              <TypeWriter />
            </div>

            <p
              className="text-base text-gray-500 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed animate-[fadeInUp_0.6s_ease-out_0.5s_both]"
            >
              {t("hero.bio")}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
              <a
                href="/cv/CV-Claudio-Fanelli-Frontend-DAM.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                <HiDownload size={16} />
                {t("hero.downloadCV")}
              </a>
              <a
                href="/cv/CV-Claudio-Fanelli-Sistemas-Helpdesk-SMR.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                <HiDownload size={16} />
                CV Sistemas / Helpdesk
              </a>
              <button
                onClick={() => scrollTo("contact")}
                className="btn-outline flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                <HiMail size={16} />
                {t("hero.contact")}
              </button>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex-shrink-0 animate-[slideInRight_0.6s_ease-out_0.2s_both]">
            <div className="relative">
              <img
                src="/foto-perfil.jpg"
                alt={t("hero.altPhoto")}
                loading="eager"
                fetchPriority="high"
                className="w-64 h-auto sm:w-80 lg:w-[360px] animate-[float_5s_ease-in-out_infinite] will-change-transform"
              />

              {/* Corner accents */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-black dark:border-white" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-black dark:border-white" />

              {/* Floating tags */}
              {["React", "Astro", "UI/UX"].map((badge, i) => (
                <div
                  key={badge}
                  className="absolute px-4 py-2 bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 text-xs font-medium tracking-wider uppercase"
                  style={{
                    top: `${15 + i * 28}%`,
                    right: i % 2 === 0 ? "-20px" : undefined,
                    left: i % 2 !== 0 ? "-20px" : undefined,
                  }}
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-[float_2s_ease-in-out_infinite] will-change-transform"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-600">
            {t("hero.scroll")}
          </span>
          <HiOutlineChevronDown size={16} className="text-gray-400 dark:text-gray-600" />
        </div>
      </div>
    </section>
  );
}
