import { useState, useEffect } from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Gallery from "@/components/sections/Gallery";
import Results from "@/components/sections/Results";
import Process from "@/components/sections/Process";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { CosmicBackground } from "@/components/three/CosmicBackground";
import { getActiveTheme, themeBackgroundColors, type ThemeKey } from "@/components/ThemeToggle";

const Index = () => {
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
        <Hero />
        <TrustBar />
        <Gallery />
        <Results />
        <Process />
        <Pricing />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
