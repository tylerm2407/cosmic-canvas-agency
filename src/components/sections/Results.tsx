import { StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Target, Cpu, Search, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Designed to Convert Local Traffic",
    description: "Every element is optimized to turn local visitors into paying customers. From CTAs to micro-interactions, it's built for results.",
  },
  {
    icon: Cpu,
    title: "3D Experiences Without the Tech Headache",
    description: "We handle all the complex 3D development. You get a stunning, interactive site without touching a line of code.",
  },
  {
    icon: Search,
    title: "SEO-Ready, Fast, and Responsive",
    description: "Lightning-fast load times, mobile-first design, and SEO best practices baked in from day one.",
  },
  {
    icon: HeadphonesIcon,
    title: "Ongoing Support & Updates",
    description: "Your site evolves with your business. We provide continuous optimization, updates, and dedicated support.",
  },
];

export default function Results() {
  return (
    <section className="section-spacing relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm text-neon-cyan uppercase tracking-widest font-display mb-4">Why Us</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display">
            Results & <span className="glow-text">Benefits</span>
          </h2>
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
