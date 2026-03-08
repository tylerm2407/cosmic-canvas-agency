import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Sparkles, Play, Utensils, Dumbbell, Scissors, Home } from "lucide-react";
import CardSwap, { Card } from "@/components/CardSwap";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

const businessCards = [
  {
    icon: Utensils,
    title: "Restaurants & Cafés",
    description: "Immersive menus, 3D interiors, and reservation experiences that fill every seat.",
    color: "from-purple-600 to-violet-800",
    sectionId: "gallery",
  },
  {
    icon: Dumbbell,
    title: "Gyms & Studios",
    description: "Dynamic class schedules, virtual tours, and member portals that convert visitors.",
    color: "from-indigo-600 to-cyan-700",
    sectionId: "gallery",
  },
  {
    icon: Scissors,
    title: "Salons & Spas",
    description: "Elegant booking flows and 3D showcases that elevate your brand instantly.",
    color: "from-fuchsia-600 to-pink-800",
    sectionId: "gallery",
  },
  {
    icon: Home,
    title: "Real Estate",
    description: "Virtual walkthroughs and interactive listings that sell properties faster.",
    color: "from-cyan-600 to-teal-800",
    sectionId: "gallery",
  },
];

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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
                  onClick={() => scrollTo("experience")}
                >
                  <Play className="w-4 h-4" />
                  See Live Demo
                </Button>
              </div>
            </AnimatedSection>
          </div>

          {/* Right - CardSwap with business types */}
          <AnimatedSection delay={0.2} className="h-[400px] sm:h-[500px] lg:h-[550px]">
            <CardSwap cardDistance={50} verticalDistance={60} delay={4000} pauseOnHover>
              {businessCards.map((card) => (
                <Card
                  key={card.title}
                  className="w-[280px] sm:w-[320px] glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => scrollTo(card.sectionId)}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                  <div className="mt-4 text-xs text-neon-cyan font-medium uppercase tracking-wider">
                    Explore →
                  </div>
                </Card>
              ))}
            </CardSwap>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
