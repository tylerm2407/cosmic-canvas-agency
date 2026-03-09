import { useState, useEffect } from "react";
import Navbar from "@/components/sections/Navbar";
import Gallery from "@/components/sections/Gallery";
import Footer from "@/components/sections/Footer";
import Plasma from "@/components/Plasma";
import { getActiveTheme, type ThemeKey } from "@/components/ThemeToggle";

const themePlasmaColors: Record<ThemeKey, string> = {
  purple: "#8b5cf6",
  cyan: "#06b6d4",
  green: "#34d399",
  red: "#f87171",
  navy: "#60a5fa",
};

const WebsitesPage = () => {
  const [theme, setTheme] = useState<ThemeKey>(getActiveTheme);

  useEffect(() => {
    const handler = (e: Event) => {
      setTheme((e as CustomEvent<ThemeKey>).detail);
    };
    window.addEventListener("theme-change", handler);
    return () => window.removeEventListener("theme-change", handler);
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <Plasma
          key={theme}
          color={themePlasmaColors[theme]}
          speed={0.6}
          direction="forward"
          scale={1.1}
          opacity={0.8}
          mouseInteractive
        />
      </div>
      <div className="noise-overlay" />
      <Navbar />
      <main className="pt-16 relative z-10">
        <Gallery />
        
      </main>
      <Footer />
    </div>
  );
};

export default WebsitesPage;
