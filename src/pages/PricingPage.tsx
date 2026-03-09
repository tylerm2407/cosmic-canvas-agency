import { useState, useEffect } from "react";
import Navbar from "@/components/sections/Navbar";
import Pricing from "@/components/sections/Pricing";
import Footer from "@/components/sections/Footer";
import { CosmicBackground } from "@/components/three/CosmicBackground";
import { getActiveTheme, themeBackgroundColors, type ThemeKey } from "@/components/ThemeToggle";

const PricingPage = () => {
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
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
