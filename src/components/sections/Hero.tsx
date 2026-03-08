import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Sparkles, Play } from "lucide-react";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Radial glow background */}
      <div className="absolute inset-0 radial-glow-top" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-neon-purple/5 blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="space-y-8">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase glass-card text-neon-cyan border-neon-cyan/20">
                <Sparkles className="w-3.5 h-3.5" />
                Next-Gen Web Experiences for Local Brands
              </span>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-display leading-[1.1] tracking-tight">
                Websites That Leave Your Customers{" "}
                <span className="glow-text">Speechless</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
                We turn boring local business sites into interactive, immersive 3D experiences 
                that make your brand unforgettable.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <Button variant="neon" size="xl">
                  Get Your 3D Website
                </Button>
                <Button
                  variant="neon-outline"
                  size="xl"
                  onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <Play className="w-4 h-4" />
                  See Live Demo
                </Button>
              </div>
            </AnimatedSection>
          </div>

          {/* Right - 3D Scene */}
          <AnimatedSection delay={0.2} className="h-[400px] sm:h-[500px] lg:h-[600px]">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-neon-purple/30 border-t-neon-purple animate-spin" />
              </div>
            }>
              <HeroScene />
            </Suspense>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
