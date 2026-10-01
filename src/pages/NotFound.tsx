import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
      <div className="text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-[120px] md:text-[200px] font-bold leading-none text-gray-100 dark:text-gray-900"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            404
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Página no encontrada
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
            La página que buscas no existe o ha sido movida a otra ubicación.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-4 justify-center"
        >
          <Link
            to="/"
            className="btn-primary"
          >
            Volver al inicio
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-outline"
          >
            Volver atrás
          </button>
        </motion.div>

        {/* Easter egg: floating elements */}
        <motion.div
          className="absolute top-20 left-20 w-2 h-2 bg-gray-200 dark:bg-gray-800"
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-3 h-3 bg-gray-200 dark:bg-gray-800"
          animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>
    </div>
  );
}
