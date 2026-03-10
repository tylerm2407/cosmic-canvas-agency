import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Maria Santos",
    business: "Santos Family Restaurant",
    location: "Miami, FL",
    quote:
      "We went from zero online presence to fully booked weekends within three weeks of launch. Our customers constantly mention how impressive the site looks — it's night and day compared to what we had before.",
    stars: 5,
  },
  {
    name: "Derek Williams",
    business: "Iron Peak Fitness",
    location: "Austin, TX",
    quote:
      "I was skeptical a website could make that big a difference. Then our membership inquiries tripled in the first month. These guys know exactly what local businesses need — and they deliver fast.",
    stars: 5,
  },
  {
    name: "Priya Kapoor",
    business: "Bloom Beauty Studio",
    location: "Chicago, IL",
    quote:
      "The process was smooth, fast, and actually fun. We had a live site in under two weeks. The online booking system alone paid for itself within the first month — and clients keep complimenting the design.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section-spacing relative">
      <div className="absolute inset-0 radial-glow-center opacity-20 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm text-neon-cyan uppercase tracking-widest font-display mb-4">Client Stories</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display">
            Real Businesses, <span className="glow-text">Real Results</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Don't take our word for it. Here's what business owners say after working with us.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <div className="glass-card-hover p-6 h-full flex flex-col gap-5">
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-neon-cyan text-neon-cyan" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">"{t.quote}"</p>
                <div className="pt-4 border-t border-border/30">
                  <p className="font-display font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t.business} &middot; {t.location}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
