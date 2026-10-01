import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiSend, FiMapPin, FiPhone, FiMail, FiClock, FiCheck } from "react-icons/fi";
import { personalInfo } from "../../data/personal";
import { fadeInUp, staggerContainer, fadeInLeft, fadeInRight } from "../../animations";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name || name.length < 2 || !email || !subject || subject.length < 3 || !message || message.length < 10) {
      return;
    }

    const subjectLine = encodeURIComponent(subject);
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\nEmpresa: ${formData.get("company") || "No indicada"}\n\n${message}`
    );

    // No simulamos un envío: abrimos el cliente de correo del usuario.
    setStatus("success");
    window.location.href = `mailto:${personalInfo.email}?subject=${subjectLine}&body=${body}`;
  };

  return (
    <section id="contact" className="py-32 relative bg-gray-50/50 dark:bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeInUp} className="mb-20">
            <span className="tag mb-6 inline-block">{t("contact.tag")}</span>
            <h2 className="section-title text-left">
              <span className="gradient-text">{t("contact.title")}</span>
            </h2>
            <div className="w-20 h-[2px] bg-black dark:bg-white mt-6" />
            <p className="section-subtitle text-left mt-6 max-w-xl">
              {t("contact.subtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div variants={fadeInLeft} className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 p-8">
                <h3
                  className="font-bold text-lg mb-6"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {t("contact.info")}
                </h3>
                <div className="space-y-5">
                  {[
                    { icon: <FiMapPin />, label: t("contact.address"), value: `${personalInfo.location.address}, ${personalInfo.location.city}` },
                    { icon: <FiMapPin />, label: t("contact.country"), value: personalInfo.location.country },
                    { icon: <FiPhone />, label: t("contact.phone"), value: personalInfo.phone },
                    { icon: <FiMail />, label: t("contact.email"), value: personalInfo.email },
                    { icon: <FiClock />, label: t("contact.schedule"), value: personalInfo.schedule },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-gray-500 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-sm font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="overflow-hidden h-48 bg-gray-100 dark:bg-[#141414]">
                <iframe
                  title={t("contact.mapTitle")}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.403!2d-3.7038!3d40.4168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42299780d78e07%3A0xc4a3e1c8e1b1b1b1!2sGran%20V%C3%ADa%2C%20Madrid!5e0!3m2!1ses!2ses!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%)' }}
                  allowFullScreen={false}
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={fadeInRight} className="lg:col-span-3">
              <form ref={formRef} onSubmit={onSubmit} className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 p-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-2">
                      {t("contact.name")} *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      required
                      minLength={2}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-[#141414] border border-black/5 dark:border-white/5 focus:outline-none focus:border-black dark:focus:border-white transition-colors text-sm"
                      placeholder={t("contact.placeholder.name")}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-2">
                      {t("contact.email")} *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-[#141414] border border-black/5 dark:border-white/5 focus:outline-none focus:border-black dark:focus:border-white transition-colors text-sm"
                      placeholder={t("contact.placeholder.email")}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-company" className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-2">
                      {t("contact.company")}
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-[#141414] border border-black/5 dark:border-white/5 focus:outline-none focus:border-black dark:focus:border-white transition-colors text-sm"
                      placeholder={t("contact.placeholder.company")}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-2">
                      {t("contact.subject")} *
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      required
                      minLength={3}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-[#141414] border border-black/5 dark:border-white/5 focus:outline-none focus:border-black dark:focus:border-white transition-colors text-sm"
                      placeholder={t("contact.placeholder.subject")}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-2">
                    {t("contact.message")} *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    minLength={10}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-[#141414] border border-black/5 dark:border-white/5 focus:outline-none focus:border-black dark:focus:border-white transition-colors text-sm resize-none"
                    placeholder={t("contact.placeholder.message")}
                  />
                </div>
                <div aria-live="polite" aria-atomic="true">
                  {status === "success" && (
                    <p className="text-sm text-green-600 mb-4">{t("contact.success")}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`w-full py-4 font-medium text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] ${
                    status === "success"
                      ? "bg-green-600 text-white"
                      : "bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                  } disabled:opacity-50`}
                >
                  {status === "sending" ? (
                    <>
                      <div className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
                      {t("contact.sending")}
                    </>
                  ) : status === "success" ? (
                    <>
                      <FiCheck size={16} />
                      {t("contact.success")}
                    </>
                  ) : (
                    <>
                      <FiSend size={14} />
                      {t("contact.send")}
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
