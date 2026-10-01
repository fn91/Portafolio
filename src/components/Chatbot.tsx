import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiX, FiMessageSquare } from "react-icons/fi";
import { personalInfo } from "../data/personal";
import { projects } from "../data/projects";
import { services } from "../data/content";

function generateResponse(message) {
  const lower = message.toLowerCase();

  // Saludos
  if (lower.includes("hola") || lower.includes("buenos") || lower.includes("buenas")) {
    return "¡Hola! 👋 Soy el asistente virtual de Claudio Fanelli Rodríguez. Puedo ayudarte con información sobre su perfil, proyectos, habilidades o formas de contacto. ¿En qué puedo ayudarte?";
  }

  // Experiencia
  if (lower.includes("experiencia") || lower.includes("trayectoria") || lower.includes("trabajo")) {
    return "Claudio es desarrollador Front-End con formación en DAM (Desarrollo de Aplicaciones Multiplataforma). Ha desarrollado 6+ proyectos personales usando React, Astro, Tailwind CSS y JavaScript. Actualmente busca su primera oportunidad profesional donde pueda seguir creciendo.";
  }

  // Proyectos
  if (lower.includes("proyecto") || lower.includes("portfolio") || lower.includes("trabajo")) {
    return `Claudio tiene ${projects.length} proyectos destacados:\n\n${projects.map((p) => `• ${p.title}: ${p.description.slice(0, 60)}...`).join("\n")}\n\nPuedes ver más detalles en la sección de Proyectos.`;
  }

  // Tecnologías / Habilidades
  if (lower.includes("tecnología") || lower.includes("tech") || lower.includes("stack") || lower.includes("habilidad") || lower.includes("sabe")) {
    return "El stack tecnológico de Claudio incluye:\n\n• Frontend: React, Astro, JavaScript, HTML5, CSS3\n• Estilos: Tailwind CSS, Bootstrap\n• Herramientas: Git, GitHub, Figma, Vercel\n• Backend básico: Python\n\nCon niveles de dominio entre 65% y 95%.";
  }

  // Servicios
  if (lower.includes("servicio") || lower.includes("hace") || lower.includes("ofrece")) {
    return `Claudio ofrece servicios de:\n\n${services.map((s) => `• ${s.title}: ${s.description}`).join("\n\n")}`;
  }

  // Contacto
  if (lower.includes("contacto") || lower.includes("email") || lower.includes("contratar") || lower.includes("llamar")) {
    return `Puedes contactar a Claudio a través de:\n\n• Email: ${personalInfo.email}\n• Teléfono: ${personalInfo.phone}\n• LinkedIn: linkedin.com/in/claudio-fanelli\n• GitHub: github.com/fn91\n\nO utiliza el formulario de contacto en la sección correspondiente.`;
  }

  // Formación
  if (lower.includes("estudio") || lower.includes("formación") || lower.includes("universidad") || lower.includes("bootcamp")) {
    return "La formación de Claudio incluye:\n\n• DAM (Desarrollo de Aplicaciones Multiplataforma) - 2022-2024\n• SMR (Sistemas Microinformáticos y Redes) - 2013-2015\n• Front-End Bootcamp 2025\n• Ciberseguridad & Performance";
  }

  // Disponibilidad
  if (lower.includes("disponible") || lower.includes("contratar") || lower.includes("freelance")) {
    return "¡Sí! Claudio está disponible para nuevos desafíos profesionales. Busca su primera oportunidad como Front-End Developer. Puedes contactarle a través del formulario de contacto o por email.";
  }

  // CV
  if (lower.includes("cv") || lower.includes("curriculum") || lower.includes("currículum")) {
    return "Puedes descargar el CV de Claudio en la sección de Enlaces importantes, o hacer clic en el botón 'Descargar CV' en la sección principal.";
  }

  // GitHub
  if (lower.includes("github") || lower.includes("repositorio") || lower.includes("código")) {
    return "Puedes ver los repositorios de Claudio en: github.com/fn91\n\nAllí encontrarás sus proyectos personales y contribuciones a open source.";
  }

  // Gracias
  if (lower.includes("gracias") || lower.includes("thank")) {
    return "¡De nada! Si tienes más preguntas sobre el perfil de Claudio, no dudes en preguntar. 😊";
  }

  // Default
  return "Puedo ayudarte con información sobre:\n\n• Experiencia y formación\n• Proyectos y portfolio\n• Tecnologías que domina\n• Servicios que ofrece\n• Formas de contacto\n• Disponibilidad laboral\n\n¿Qué te gustaría saber?";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "¡Hola! 👋 Soy el asistente de Claudio Fanelli Rodríguez. Pregúntame sobre su perfil, proyectos, habilidades o formas de contacto." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(userMessage);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const quickQuestions = [
    "¿Qué proyectos tiene?",
    "¿Qué tecnologías usa?",
    "¿Cómo contactarlo?",
  ];

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? <FiX size={22} /> : <FiMessageSquare size={22} />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] shadow-2xl flex flex-col overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a]"
          >
            {/* Header */}
            <div className="bg-black dark:bg-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/10 dark:bg-black/10 flex items-center justify-center text-white dark:text-black font-bold text-xs"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  CF
                </div>
                <div>
                  <h4 className="font-semibold text-white dark:text-black text-sm">Asistente IA</h4>
                  <p className="text-white/50 dark:text-black/50 text-[10px] uppercase tracking-wider">En línea</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 dark:hover:bg-black/10 text-white dark:text-black transition-colors"
                aria-label="Cerrar chat"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-gray-100 dark:bg-[#141414] text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-[#141414] px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="px-3 py-1 border border-black/10 dark:border-white/10 text-[11px] font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-black/5 dark:border-white/5">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 px-4 py-3 bg-gray-50 dark:bg-[#141414] text-sm focus:outline-none border border-black/5 dark:border-white/5"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!input.trim()}
                  className="px-4 py-3 bg-black text-white dark:bg-white dark:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <FiSend size={16} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
