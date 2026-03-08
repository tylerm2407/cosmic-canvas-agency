import { Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Sparkles, Play, ExternalLink } from "lucide-react";
import CardSwap, { Card } from "@/components/CardSwap";

const businessCards = [
  {
    title: "CostClarityPro",
    description: "Smart cost analysis and financial clarity for businesses that demand precision.",
    url: "https://costclaritypro.com",
    color: "from-purple-600 to-violet-800",
  },
  {
    title: "MarketPulseTerminal",
    description: "Real-time market data and trading insights in a powerful terminal interface.",
    url: "https://marketpulseterminal.com",
    color: "from-indigo-600 to-cyan-700",
  },
  {
    title: "IncomeAIPro",
    description: "AI-powered income optimization and financial planning made effortless.",
    url: "https://incomeaipro.com",
    color: "from-fuchsia-600 to-pink-800",
  },
  {
    title: "PropFirmAnalytics",
    description: "Advanced analytics and performance tracking for proprietary trading firms.",
    url: "https://propfirmanalytics.com",
    color: "from-cyan-600 to-teal-800",
  },
  {
    title: "NovaWealthHQ",
    description: "Next-generation wealth management headquarters for modern investors.",
    url: "https://novawealthhq.com",
    color: "from-amber-500 to-orange-700",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 radial-glow-top" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-neon-purple/5 blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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

          <AnimatedSection delay={0.2} className="h-[400px] sm:h-[500px] lg:h-[550px]">
            <CardSwap cardDistance={50} verticalDistance={60} delay={4000} pauseOnHover>
              {businessCards.map((card) => (
                <Card
                  key={card.title}
                  className="w-[280px] sm:w-[320px] glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => window.open(card.url, "_blank", "noopener,noreferrer")}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                  <div className="mt-4 text-xs text-neon-cyan font-medium tracking-wider flex items-center gap-1">
                    Visit Site <ExternalLink className="w-3 h-3" />
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
