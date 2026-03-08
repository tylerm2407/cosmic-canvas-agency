import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Phone, Palette, Rocket, RefreshCw } from "lucide-react";

const steps = [
  { icon: Phone, title: "Discovery Call", description: "We learn about your business, goals, and audience to craft the perfect strategy." },
  { icon: Palette, title: "Concept & 3D Prototype", description: "Interactive mockups and 3D concepts so you see your site before it's built." },
  { icon: Rocket, title: "Build & Launch", description: "Pixel-perfect development, thorough testing, and a seamless launch." },
  { icon: RefreshCw, title: "Continuous Optimization", description: "Ongoing performance tuning, A/B testing, and feature updates." },
];

export default function Process() {
  return (
    <section id="process" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 radial-glow-center" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm text-neon-cyan uppercase tracking-widest font-display mb-4">Process</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display">
            How It <span className="glow-text">Works</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan opacity-30" />

          {steps.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className="glass-card-hover p-6 text-center space-y-4 relative">
                <div className="w-14 h-14 rounded-full bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center mx-auto relative z-10">
                  <step.icon className="w-6 h-6 text-neon-purple" />
                </div>
                <span className="text-xs font-display text-muted-foreground uppercase tracking-widest">Step {i + 1}</span>
                <h3 className="font-display font-bold text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
