import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useTheme } from "../../context/useTheme";
import { useScrollProgress, useActiveSection } from "../../hooks/useScroll";
import { useTranslation } from "react-i18next";
import { CommandPalette } from "../command-palette";

const navLinks = [
  { id: "hero", key: "nav.home" },
  { id: "about", key: "nav.about" },
  { id: "technologies", key: "nav.technologies" },
  { id: "projects", key: "nav.projects" },
  { id: "experience", key: "nav.experience" },
  { id: "contact", key: "nav.contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const progress = useScrollProgress();
  const activeSection = useActiveSection(navLinks.map((l) => l.id));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]">
        <div
          className="h-full bg-black dark:bg-white transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <nav
        className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-500 animate-[slideDown_0.5s_ease-out] ${
          scrolled
            ? "bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-black/5 dark:border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}
              className="text-lg font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              CF<span className="text-gray-400 dark:text-gray-600">.</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3 py-2 text-[13px] font-medium transition-all duration-200 ${
                    activeSection === link.id
                      ? "text-black dark:text-white"
                      : "text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {t(link.key)}
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Command palette trigger */}
              <CommandPalette />

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-sm hover:scale-110 active:scale-95 active:rotate-180"
                aria-label="Toggle theme"
              >
                {isDark ? "☀" : "☾"}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-9 h-9 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isOpen ? <HiX size={16} /> : <HiMenu size={16} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-[#0a0a0a] border-l border-black/5 dark:border-white/5 p-8 pt-24 animate-[slideInRight_0.3s_ease-out]">
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-left px-4 py-3 text-sm font-medium transition-all ${
                    activeSection === link.id
                      ? "text-black dark:text-white"
                      : "text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white"
                  }`}
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  {t(link.key)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
