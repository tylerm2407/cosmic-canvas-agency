import { useState, useEffect } from "react";
import Navbar from "@/components/sections/Navbar";
import Gallery from "@/components/sections/Gallery";
import Experience from "@/components/sections/Experience";
import Footer from "@/components/sections/Footer";
import { CosmicBackground } from "@/components/three/CosmicBackground";
import { getActiveTheme, themeBackgroundColors, type ThemeKey } from "@/components/ThemeToggle";

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
      <CosmicBackground key={theme} themeColors={themeBackgroundColors[theme]} />
      <div className="noise-overlay" />
      <Navbar />
      <main className="pt-16">
        <Gallery />
        <Experience />
      </main>
      <Footer />
    </div>
  );
};

export default WebsitesPage;
