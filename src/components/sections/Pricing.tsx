import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Portfolio",
    tagline: "Personal portfolio site",
    price: "$100",
    timeline: "Delivered in 1 week",
    features: [
      "Custom personal portfolio",
      "Responsive design",
      "Project showcase section",
      "Contact form",
      "1 revision round",
    ],
  },
  {
    name: "Launch",
    tagline: "For solo & small businesses",
    price: "From $499",
    timeline: "Delivered in 1–2 weeks",
    features: [
      "Custom responsive website",
      "Conversion-optimized pages",
      "SEO fundamentals",
      "Contact form integration",
      "30-day post-launch support",
    ],
  },
  {
    name: "Growth",
    tagline: "For growing local brands",
    price: "From $999",
    timeline: "Delivered in 2 weeks",
    features: [
      "Everything in Launch",
      "Interactive animations & transitions",
      "Analytics & conversion tracking",
      "Blog or portfolio section",
      "90-day optimization support",
    ],
    featured: true,
  },
  {
    name: "Signature 3D",
    tagline: "Premium immersive build",
    price: "From $1,999",
    timeline: "Delivered in 2–3 weeks",
    features: [
      "Everything in Growth",
      "Custom 3D hero experience",
      "Immersive scroll interactions",
      "Performance-optimized 3D",
      "Ongoing dedicated support",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="section-spacing relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm text-neon-cyan uppercase tracking-widest font-display mb-4">Pricing</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display">
            Investment <span className="glow-text">Tiers</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Every project is unique. Choose a starting point and we'll tailor a proposal to your goals.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div className={`glass-card-hover p-8 h-full flex flex-col ${plan.featured ? "glow-border ring-1 ring-neon-purple/30" : ""}`}>
                <h3 className="font-display font-bold text-xl">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.tagline}</p>
                <div className="mt-4 mb-6">
                  <span className="text-2xl font-bold font-display glow-text">{plan.price}</span>
                  <p className="text-xs text-muted-foreground mt-1">{plan.timeline}</p>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-neon-cyan shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button variant={plan.featured ? "neon" : "neon-outline"} size="lg" className="w-full">
                  Request a Quote
                </Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
