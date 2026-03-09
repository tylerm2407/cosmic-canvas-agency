import { useState, useEffect } from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Results from "@/components/sections/Results";
import WebsitePreview from "@/components/sections/WebsitePreview";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import Galaxy from "@/components/Galaxy";
import { getActiveTheme, type ThemeKey } from "@/components/ThemeToggle";

const themeHueShifts: Record<ThemeKey, number> = {
  purple: 270,
  cyan: 180,
  green: 140,
  red: 0,
  navy: 220,
};

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
      <div className="fixed inset-0 z-0">
        <Galaxy
          key={theme}
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={themeHueShifts[theme]}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div>
      <div className="noise-overlay" />
      <Navbar />
      <main className="pt-16 relative z-10">
        <Hero />
        <Results />
        <WebsitePreview />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
