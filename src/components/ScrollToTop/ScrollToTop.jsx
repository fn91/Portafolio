import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTop() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 left-6 z-50 w-10 h-10 bg-black text-white dark:bg-white dark:text-black flex items-center justify-center hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 hover:scale-110 active:scale-95 animate-[fadeIn_0.3s_ease-out]"
      aria-label={t("scrollToTop.label")}
    >
      <FiArrowUp size={16} />
    </button>
  );
}
