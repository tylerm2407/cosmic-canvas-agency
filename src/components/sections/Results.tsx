import { StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Target, Cpu, Search, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Built to Convert, Not Just Look Good",
    description: "Every section, CTA, and layout decision is designed to turn visitors into leads. Beautiful design means nothing without results.",
  },
  {
    icon: Cpu,
    title: "Modern Tech, No Templates",
    description: "We build with React, Next.js, and cutting-edge tools — not drag-and-drop builders. Your site will outperform the competition technically.",
  },
  {
    icon: Search,
    title: "SEO-Ready From Day One",
    description: "Fast load times, mobile-first design, semantic markup, and structured data. Google-friendly by default, not as an afterthought.",
  },
  {
    icon: ShieldCheck,
    title: "Ongoing Support You Can Count On",
    description: "Every project includes post-launch support. We're a long-term partner, not a one-and-done shop. Your site grows as your business does.",
  },
];

export default function Results() {
  return (
    <section className="section-spacing relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm text-neon-cyan uppercase tracking-widest font-display mb-4">Why Us</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display">
            Everything Your Business <span className="glow-text">Needs to Win Online</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            We don't just build websites. We build the competitive edge your business deserves.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="glass-card-hover p-6 h-full space-y-4">
                <div className="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-neon-purple" />
                </div>
                <h3 className="font-display font-bold text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
