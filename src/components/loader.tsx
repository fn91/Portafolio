import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export function Loader() {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-[#0a0a0a]"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        role="status"
        aria-label={t("loader.label")}
      >
        <div className="relative">
          {/* Outer ring */}
          <motion.div
            className="w-24 h-24 border border-black/10 dark:border-white/10"
            initial={{ rotate: 0, scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Inner text */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            <span
              className="text-3xl font-bold"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              CF<span className="text-gray-300 dark:text-gray-700">.</span>
            </span>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="absolute -bottom-8 left-0 h-[1px] bg-black dark:bg-white"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
