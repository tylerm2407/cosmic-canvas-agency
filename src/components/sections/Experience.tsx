import { Suspense, lazy, useState } from "react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Button } from "@/components/ui/button";

const ExperienceScene = lazy(() => import("@/components/three/ExperienceScene"));

const modes = ["Restaurant", "Gym", "Salon", "Real Estate"];

export default function Experience() {
  const [activeTheme, setActiveTheme] = useState("Restaurant");

  return (
    <section id="experience" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 radial-glow-top" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-12">
          <p className="text-sm text-neon-cyan uppercase tracking-widest font-display mb-4">Interactive</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display">
            Experience the <span className="glow-text">Difference</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="glass-card p-2 max-w-4xl mx-auto">
            <div className="h-[350px] sm:h-[450px] rounded-xl overflow-hidden">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-xl">
                  <div className="w-12 h-12 rounded-full border-2 border-neon-purple/30 border-t-neon-purple animate-spin" />
                </div>
              }>
                <ExperienceScene activeTheme={activeTheme} onThemeChange={setActiveTheme} />
              </Suspense>
            </div>

            <div className="flex flex-wrap justify-center gap-3 p-4">
              {modes.map((mode) => (
                <Button
                  key={mode}
                  variant={activeTheme === mode ? "neon" : "neon-outline"}
                  size="sm"
                  onClick={() => setActiveTheme(mode)}
                >
                  {mode}
                </Button>
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground pb-3">
              Drag to rotate · Scroll to zoom · Click a mode to change the experience
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
