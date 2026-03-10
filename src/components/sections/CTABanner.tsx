import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTABanner() {
  return (
    <section className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-background to-neon-blue/10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-neon-purple/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto">
          <p className="text-sm text-neon-cyan uppercase tracking-widest font-display mb-6">Ready to Start?</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6">
            Your next customer is already{" "}
            <span className="glow-text">searching for you.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-xl mx-auto">
            Don't let a bad — or missing — website cost you business. Book a free 30-minute discovery
            call and we'll show you exactly what's possible.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <Button variant="neon" size="xl" className="gap-2">
                <Calendar className="w-4 h-4" />
                Book Free Discovery Call
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="neon-outline" size="xl" className="gap-2">
                View Pricing
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground mt-8">
            No commitment required &middot; Sites delivered in 1–2 weeks &middot; Free consultation
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
