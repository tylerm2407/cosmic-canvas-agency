import { useState, useEffect } from "react";
import Navbar from "@/components/sections/Navbar";
import Pricing from "@/components/sections/Pricing";
import Footer from "@/components/sections/Footer";
import GridDistortion from "@/components/GridDistortion";
import { getActiveTheme, type ThemeKey } from "@/components/ThemeToggle";

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
      {/* GridDistortion Background */}
      <div className="fixed inset-0 w-full h-full">
        <GridDistortion
          key={theme}
          imageSrc="https://picsum.photos/1920/1080?grayscale"
          grid={10}
          mouse={0.1}
          strength={0.15}
          relaxation={0.9}
          className="z-0"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm z-[1]" />
      </div>
      
      <div className="noise-overlay" />

      <Navbar />

      <main className="pt-16 relative z-10">
        <Pricing />
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;
