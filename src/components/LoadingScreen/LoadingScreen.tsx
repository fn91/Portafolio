import { useState, useEffect, useRef } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const codeLines = [
  "const portfolio = {",
  '  name: "Fanelli",',
  '  role: "Front-End Developer",',
  "  skills: [",
  '    "React", "TypeScript", "Tailwind",',
  '    "Next.js", "Node.js", "GSAP"',
  "  ],",
  "  passion: \"Building beautiful UIs\",",
  "};",
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"typing" | "compiling" | "ready" | "exit">("typing");
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Typing effect
  useEffect(() => {
    if (phase !== "typing") return;
    if (visibleLines >= codeLines.length) {
      setPhase("compiling");
      return;
    }
    const timer = setTimeout(() => {
      setVisibleLines((v) => v + 1);
    }, 180 + Math.random() * 120);
    return () => clearTimeout(timer);
  }, [visibleLines, phase]);

  // Compiling progress
  useEffect(() => {
    if (phase !== "compiling") return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          triggerGlitch();
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [phase]);

  const triggerGlitch = () => {
    setGlitchActive(true);
    setTimeout(() => {
      setPhase("ready");
      setTimeout(() => setPhase("exit"), 500);
    }, 400);
  };

  useEffect(() => {
    if (phase === "exit") {
      const timer = setTimeout(onComplete, 700);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] overflow-hidden transition-opacity duration-500 ${
        phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"
      } ${glitchActive ? "animate-glitch" : ""}`}
    >
      {/* Scan lines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          }}
        />
      </div>

      {/* Moving scan line */}
      <div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none animate-[scanline_3s_linear_infinite]"
      />

      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-lg px-6">
        {/* Terminal window */}
        <div
          className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden shadow-2xl animate-[scaleIn_0.6s_ease-out]"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="ml-2 text-xs text-neutral-500 font-mono">
              portfolio.tsx
            </span>
          </div>

          {/* Code area */}
          <div className="p-5 font-mono text-sm leading-relaxed min-h-[280px]">
            {codeLines.slice(0, visibleLines).map((line, i) => (
              <div
                key={i}
                className="flex animate-[fadeIn_0.15s_ease-out]"
              >
                <span className="text-neutral-600 w-8 text-right mr-4 select-none">
                  {i + 1}
                </span>
                <span className="text-neutral-300">
                  {highlightSyntax(line)}
                </span>
              </div>
            ))}
            {phase === "typing" && (
              <div className="flex">
                <span className="text-neutral-600 w-8 text-right mr-4 select-none">
                  {visibleLines + 1}
                </span>
                <span
                  className={`inline-block w-2 h-5 bg-white/70 ${
                    cursorVisible ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            )}
          </div>

          {/* Progress section */}
          <div className="px-5 pb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-neutral-500 font-mono uppercase tracking-wider">
                {phase === "typing"
                  ? "Initializing"
                  : phase === "compiling"
                  ? "Compiling"
                  : "Ready"}
              </span>
              <span className="text-xs text-neutral-400 font-mono tabular-nums">
                {Math.min(Math.floor(progress), 100)}%
              </span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-100"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background:
                    progress < 100
                      ? "linear-gradient(90deg, #3b82f6, #8b5cf6)"
                      : "linear-gradient(90deg, #22c55e, #10b981)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div
          className="mt-6 text-center animate-[fadeIn_0.3s_ease-out_0.3s_both]"
        >
          <p className="text-[10px] text-neutral-600 tracking-[0.4em] uppercase font-mono">
            Front-End Developer Portfolio
          </p>
        </div>
      </div>

      {/* Glitch overlay */}
      {glitchActive && (
        <>
          <div
            className="absolute inset-0 bg-white mix-blend-overlay pointer-events-none animate-[fadeIn_0.4s_ease-out]"
          />
          <div className="absolute inset-0 pointer-events-none animate-glitch">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-[2px] bg-cyan-400/50"
                style={{ top: `${20 + i * 30}%` }}
              />
            ))}
          </div>
        </>
      )}

      {/* Corner brackets */}
      {[
        "top-6 left-6",
        "top-6 right-6 scale-x-[-1]",
        "bottom-6 right-6 scale-[-1]",
        "bottom-6 left-6 scale-y-[-1]",
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} text-white/10 animate-[fadeIn_0.4s_ease-out_${0.2 + i * 0.1}s_both]`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M2 8V2H8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

function highlightSyntax(line: string) {
  return line
    .replace(
      /(".*?")/g,
      '<span class="text-emerald-400">$1</span>'
    )
    .replace(
      /(const|let|var|return|import|from)/g,
      '<span class="text-purple-400">$1</span>'
    )
    .replace(
      /(\{|\}|\[|\])/g,
      '<span class="text-yellow-400/70">$1</span>'
    )
    .replace(
      /(:)/g,
      '<span class="text-neutral-500">$1</span>'
    )
    .replace(
      /(,)/g,
      '<span class="text-neutral-500">$1</span>'
    );
}
