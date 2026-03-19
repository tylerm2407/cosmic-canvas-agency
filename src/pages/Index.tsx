import { useState, useEffect } from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Results from "@/components/sections/Results";
import Process from "@/components/sections/Process";
import WebsitePreview from "@/components/sections/WebsitePreview";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import SoftAurora from "@/components/SoftAurora";
import { getActiveTheme, type ThemeKey } from "@/components/ThemeToggle";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const themeAuroraColors: Record<ThemeKey, { color1: string; color2: string }> = {
  purple: { color1: "#B19EEF", color2: "#5227FF" },
  cyan: { color1: "#87f0f7", color2: "#2F4BC0" },
  green: { color1: "#34d399", color2: "#065f46" },
  red: { color1: "#f87171", color2: "#991b1b" },
  navy: { color1: "#60a5fa", color2: "#1e3a8a" },
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

  // Lenis smooth scrolling synced with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    const rafCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, []);

  const { color1, color2 } = themeAuroraColors[theme];

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <SoftAurora
          key={theme}
          speed={0.6}
          scale={1.5}
          brightness={1}
          color1={color1}
          color2={color2}
          noiseFrequency={2.5}
          noiseAmplitude={1}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1}
          enableMouseInteraction
          mouseInfluence={0.25}
        />
      </div>
      <div className="noise-overlay" />
      <Navbar />
      <main className="pt-16 relative z-10">
        <Hero />
        <TrustBar />
        <Results />
        <Process />
        <WebsitePreview />
        <Testimonials />
        <CTABanner />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
