import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Play, ExternalLink } from "lucide-react";
import CardSwap, { Card } from "@/components/CardSwap";
import ShinyText from "@/components/ShinyText";

const businessCards = [
  {
    title: "CostClarityPro",
    description: "Smart cost analysis and financial clarity for businesses that demand precision.",
    url: "https://costclaritypro.com",
    color: "from-purple-600 to-violet-800",
    screenshot: "/screenshots/costclaritypro.png",
  },
  {
    title: "MarketPulseTerminal",
    description: "Real-time market data and trading insights in a powerful terminal interface.",
    url: "https://marketpulseterminal.com",
    color: "from-indigo-600 to-cyan-700",
    screenshot: "/screenshots/marketpulseterminal.png",
  },
  {
    title: "IncomeAIPro",
    description: "AI-powered income optimization and financial planning made effortless.",
    url: "https://incomeaipro.com",
    color: "from-fuchsia-600 to-pink-800",
    screenshot: "/screenshots/incomeaipro.png",
  },
  {
    title: "PropFirmAnalytics",
    description: "Advanced analytics and performance tracking for proprietary trading firms.",
    url: "https://propfirmanalytics.com",
    color: "from-cyan-600 to-teal-800",
    screenshot: "/screenshots/propfirmanalytics.png",
  },
  {
    title: "NovaWealthHQ",
    description: "Next-generation wealth management headquarters for modern investors.",
    url: "https://novawealthhq.com",
    color: "from-amber-500 to-orange-700",
    screenshot: "/screenshots/novawealthhq.png",
  },
];

function getComputedHSL(varName: string): string {
  const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return val ? `hsl(${val})` : "#a855f7";
}

export default function Hero() {
  const [primaryColor, setPrimaryColor] = useState(() => getComputedHSL("--primary"));
  const [cyanColor, setCyanColor] = useState(() => getComputedHSL("--neon-cyan"));

  useEffect(() => {
    const update = () => {
      setPrimaryColor(getComputedHSL("--primary"));
      setCyanColor(getComputedHSL("--neon-cyan"));
    };
    window.addEventListener("theme-change", update);
    // also run once after mount to catch initial theme
    requestAnimationFrame(update);
    return () => window.removeEventListener("theme-change", update);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 radial-glow-top" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-neon-purple/5 blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center">
            <AnimatedSection>
                <ShinyText
                  text="✨ Next-Gen Web Experiences for Local Brands"
                  speed={3}
                  color={cyanColor}
                  shineColor="#ffffff"
                  spread={120}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase"
                />
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-display leading-[1.1] tracking-tight">
                <ShinyText
                  key={primaryColor}
                  text="Websites That Leave Your Customers Speechless"
                  speed={3}
                  color={primaryColor}
                  shineColor="#ffffff"
                  spread={120}
                />
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <ShinyText
                text="We turn boring local business sites into interactive, immersive 3D experiences that make your brand unforgettable."
                speed={4}
                color="#888888"
                shineColor="#cccccc"
                spread={120}
                className="text-lg sm:text-xl max-w-lg leading-relaxed mx-auto"
              />
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
                  className="w-[280px] sm:w-[320px] glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => window.open(card.url, "_blank", "noopener,noreferrer")}
                >
                  <div className="w-full h-[140px] sm:h-[160px] overflow-hidden border-b border-white/10">
                    <img
                      src={card.screenshot}
                      alt={`${card.title} preview`}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-foreground mb-1">{card.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{card.description}</p>
                    <div className="mt-3 text-xs text-neon-cyan font-medium tracking-wider flex items-center gap-1">
                      Visit Site <ExternalLink className="w-3 h-3" />
                    </div>
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
