import { AnimatedSection } from "@/components/animations/AnimatedSection";

const logos = [
  "Bella's Kitchen", "FitForge Gym", "Luxe Salon", "Primo Realty",
  "Harbor Café", "Peak Fitness", "Radiant Spa", "Metro Properties",
];

export default function TrustBar() {
  return (
    <section className="relative py-16 border-y border-border/30">
      <div className="absolute inset-0 bg-muted/20" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <p className="text-center text-sm text-muted-foreground uppercase tracking-widest mb-8 font-display">
            Trusted by forward-thinking local businesses
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {logos.map((name) => (
              <div
                key={name}
                className="text-muted-foreground/40 font-display font-bold text-lg tracking-wide hover:text-foreground/60 transition-colors duration-300"
              >
                {name}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
