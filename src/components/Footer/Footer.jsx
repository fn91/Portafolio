import { useTranslation } from "react-i18next";
import { personalInfo } from "../../data/personal";

export default function Footer() {
  const { t } = useTranslation();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black dark:bg-[#0a0a0a] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a
              href="#hero"
              className="text-xl font-bold inline-block"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              CF<span className="text-gray-600">.</span>
            </a>
            <p className="text-gray-500 text-sm mt-4 leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] mb-5 text-gray-500">
              {t("footer.navigation")}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t("nav.home"), id: "hero" },
                { label: t("nav.about"), id: "about" },
                { label: t("nav.projects"), id: "projects" },
                { label: t("nav.experience"), id: "experience" },
                { label: t("nav.contact"), id: "contact" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] mb-5 text-gray-500">
              {t("footer.contactTitle")}
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>{personalInfo.email}</li>
              <li>{personalInfo.phone}</li>
              <li>{personalInfo.location.city}, {personalInfo.location.country}</li>
              <li>{personalInfo.schedule}</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} {personalInfo.name}. {t("footer.rights")}
          </p>
          <div className="flex gap-6 text-xs text-gray-600">
            <a href="#" className="hover:text-white transition-colors">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-white transition-colors">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
