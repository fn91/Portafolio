import { useEffect, useState, useCallback, useRef } from "react";
import { useTheme } from "../context/useTheme";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { isDark, toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const scrollTo = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("claudiofanellirodriguez03@gmail.com");
    setOpen(false);
  };

  const navigationItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "technologies", label: "Technologies" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "services", label: "Services" },
    { id: "skills", label: "Skills" },
    { id: "blog", label: "Blog" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ];

  const actionItems = [
    { id: "theme", label: isDark ? "☀ Modo claro" : "☾ Modo oscuro", action: toggleTheme },
    { id: "email", label: "Copiar email", action: copyEmail },
    { id: "github", label: "GitHub", action: () => window.open("https://github.com/fn91", "_blank") },
    { id: "linkedin", label: "LinkedIn", action: () => window.open("https://www.linkedin.com/in/claudio-fanelli", "_blank") },
  ];

  const filteredNav = navigationItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );
  const filteredActions = actionItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );
  const allItems = [
    ...filteredNav.map((item) => ({ ...item, type: "nav" as const })),
    ...filteredActions.map((item) => ({ ...item, type: "action" as const })),
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, allItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && allItems[selectedIndex]) {
      const item = allItems[selectedIndex];
      if (item.type === "nav") scrollTo(item.id);
      else item.action();
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={toggle}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 dark:text-gray-500 border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-colors"
      >
        <span>⌘K</span>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]"
            onClick={() => setOpen(false)}
          />

          {/* Command palette */}
          <div className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[95] w-full max-w-lg animate-[scaleIn_0.15s_ease-out]">
            <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                onKeyDown={handleKeyDown}
                placeholder="Search sections, projects..."
                className="w-full px-4 py-3 bg-transparent border-b border-black/5 dark:border-white/5 text-sm focus:outline-none"
              />
              <div className="max-h-[300px] overflow-y-auto p-2">
                {allItems.length === 0 && (
                  <div className="py-6 text-center text-sm text-gray-400">
                    No results found.
                  </div>
                )}

                {filteredNav.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Navigation
                    </div>
                    {filteredNav.map((item, i) => (
                      <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`w-full text-left px-3 py-2 text-sm cursor-pointer transition-colors flex items-center gap-2 ${
                          i === selectedIndex
                            ? "bg-black/5 dark:bg-white/5"
                            : "hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                      >
                        <span className="w-1 h-1 bg-black dark:bg-white" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}

                {filteredActions.length > 0 && (
                  <div>
                    <div className="h-px bg-black/5 dark:bg-white/5 my-2" />
                    <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Actions
                    </div>
                    {filteredActions.map((item, i) => {
                      const globalIndex = filteredNav.length + i;
                      return (
                        <button
                          key={item.id}
                          onClick={item.action}
                          className={`w-full text-left px-3 py-2 text-sm cursor-pointer transition-colors flex items-center gap-2 ${
                            globalIndex === selectedIndex
                              ? "bg-black/5 dark:bg-white/5"
                              : "hover:bg-black/5 dark:hover:bg-white/5"
                          }`}
                        >
                          <span className="w-1 h-1 bg-black dark:bg-white" />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="px-4 py-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] text-gray-400 dark:text-gray-500">
                <span>Navigate with ↑↓</span>
                <span>Select with ↵</span>
                <span>Close with esc</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
