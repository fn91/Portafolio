import { ThemeProvider } from "./context/ThemeContext";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState, useCallback, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";

// Below-the-fold: lazy loaded
const About = lazy(() => import("./components/About/About"));
const Technologies = lazy(() => import("./components/Technologies/Technologies"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Experience = lazy(() => import("./components/Experience/Experience"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop/ScrollToTop"));

// Heavy / interactive: lazy loaded
const Chatbot = lazy(() => import("./components/Chatbot"));
const CustomCursor = lazy(() => import("./components/ui/custom-cursor").then(m => ({ default: m.CustomCursor })));
const NowPage = lazy(() => import("./pages/Now").then(m => ({ default: m.NowPage })));
const UsesPage = lazy(() => import("./pages/Uses").then(m => ({ default: m.UsesPage })));
const NotFound = lazy(() => import("./pages/NotFound").then(m => ({ default: m.NotFound })));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
      <div className="w-8 h-8 border-2 border-black/20 dark:border-white/20 border-t-black dark:border-t-white rounded-full animate-spin" />
    </div>
  );
}

function SectionFallback() {
  return <div className="min-h-[200px]" />;
}

function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Technologies />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(pointer: fine)").matches);
  }, []);

  return (
    <ThemeProvider>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      {isDesktop && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}
      <div className="noise min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/now" element={<Suspense fallback={<LoadingFallback />}><NowPage /></Suspense>} />
          <Route path="/uses" element={<Suspense fallback={<LoadingFallback />}><UsesPage /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<LoadingFallback />}><NotFound /></Suspense>} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
