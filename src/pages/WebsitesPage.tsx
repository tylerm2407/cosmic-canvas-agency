import { useState, useEffect } from "react";
import Navbar from "@/components/sections/Navbar";
import Gallery from "@/components/sections/Gallery";
import Experience from "@/components/sections/Experience";
import Footer from "@/components/sections/Footer";
import Threads from "@/components/Threads";
import { getActiveTheme, type ThemeKey } from "@/components/ThemeToggle";

const themeThreadColors: Record<ThemeKey, [number, number, number]> = {
  purple: [0.69, 0.62, 0.94],
  cyan: [0.33, 0.94, 0.97],
  green: [0.2, 0.83, 0.6],
  red: [0.97, 0.44, 0.44],
  navy: [0.38, 0.65, 0.98],
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
        <Threads
          key={theme}
          color={themeThreadColors[theme]}
          amplitude={1}
          distance={0}
          enableMouseInteraction
        />
      </div>
      <div className="noise-overlay" />
      <Navbar />
      <main className="pt-16 relative z-10">
        <Gallery />
        <Experience />
      </main>
      <Footer />
    </div>
  );
};

export default WebsitesPage;
