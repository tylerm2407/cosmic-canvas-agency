import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const featured = [
  {
    title: "CostClarityPro",
    description: "Smart cost analysis and financial clarity for businesses.",
    url: "https://costclaritypro.com",
    screenshot: "/screenshots/costclaritypro.png",
  },
  {
    title: "MarketPulseTerminal",
    description: "Real-time market data in a powerful terminal interface.",
    url: "https://marketpulseterminal.com",
    screenshot: "/screenshots/marketpulseterminal.png",
  },
  {
    title: "IncomeAIPro",
    description: "AI-powered income optimization made effortless.",
    url: "https://incomeaipro.com",
    screenshot: "/screenshots/incomeaipro.png",
  },
];

export default function WebsitePreview() {
  return (
    <section className="section-spacing relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-12">
          <p className="text-sm text-neon-cyan uppercase tracking-widest font-display mb-4">Our Work</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display">
            Featured <span className="glow-text">Websites</span>
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {featured.map((site, i) => (
            <motion.a
              key={site.title}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card-hover overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="h-40 overflow-hidden border-b border-border/20">
                <img
                  src={site.screenshot}
                  alt={`${site.title} preview`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-lg flex items-center gap-2">
                  {site.title}
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{site.description}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <AnimatedSection delay={0.2} className="text-center mt-10">
          <Link to="/websites">
            <Button variant="neon-outline" size="lg">
              View All Websites <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
