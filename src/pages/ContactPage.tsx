import { useState, useEffect } from "react";
import Navbar from "@/components/sections/Navbar";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Orb from "@/components/Orb";
import { getActiveTheme, type ThemeKey } from "@/components/ThemeToggle";

// Map theme keys to hue values for the Orb
const themeHueMap: Record<ThemeKey, number> = {
  purple: 270,
  cyan: 185,
  green: 140,
  red: 0,
  navy: 220,
};

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
    <div className="min-h-screen relative bg-background">
      {/* Orb Background */}
      <div className="fixed inset-0 z-0">
        <Orb
          key={theme}
          hue={themeHueMap[theme]}
          hoverIntensity={2}
          rotateOnHover
          forceHoverState={false}
          backgroundColor="#000000"
        />
      </div>
      <div className="noise-overlay" />
      <Navbar />
      <main className="pt-16 relative z-10">
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
