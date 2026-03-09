import { useState, useEffect } from "react";
import Navbar from "@/components/sections/Navbar";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { CosmicBackground } from "@/components/three/CosmicBackground";
import { getActiveTheme, themeBackgroundColors, type ThemeKey } from "@/components/ThemeToggle";

const ContactPage = () => {
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
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
