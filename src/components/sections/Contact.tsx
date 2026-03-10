import { useState } from "react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "", email: "", business: "", website: "", budget: "", goals: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Would connect to backend
  };

  return (
    <section id="contact" className="section-spacing relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-background to-neon-blue/10" />
      <div className="absolute inset-0 radial-glow-top" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4">
            Ready for a website your competitors{" "}
            <span className="glow-text">can't ignore?</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Let's build something extraordinary together. Tell us about your business and we'll craft a proposal.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <form onSubmit={handleSubmit} className="glass-card p-8 max-w-2xl mx-auto space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-display text-muted-foreground uppercase tracking-wider">Name</label>
                <input
                  type="text"
                  className="w-full h-11 px-4 rounded-lg bg-muted/30 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-neon-purple/50 transition"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-display text-muted-foreground uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  className="w-full h-11 px-4 rounded-lg bg-muted/30 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-neon-purple/50 transition"
                  placeholder="john@business.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-display text-muted-foreground uppercase tracking-wider">Business Name</label>
                <input
                  type="text"
                  className="w-full h-11 px-4 rounded-lg bg-muted/30 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-neon-purple/50 transition"
                  placeholder="Your Business"
                  value={formData.business}
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-display text-muted-foreground uppercase tracking-wider">Current Website URL</label>
                <input
                  type="url"
                  className="w-full h-11 px-4 rounded-lg bg-muted/30 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-neon-purple/50 transition"
                  placeholder="https://..."
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-display text-muted-foreground uppercase tracking-wider">Budget Range</label>
              <select
                className="w-full h-11 px-4 rounded-lg bg-muted/30 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-neon-purple/50 transition"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              >
                <option value="">Select a range...</option>
                <option value="under-500">Under $500</option>
                <option value="500-1500">$500 – $1,500</option>
                <option value="1500-3000">$1,500 – $3,000</option>
                <option value="3000-5000">$3,000 – $5,000</option>
                <option value="5000+">$5,000+</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-display text-muted-foreground uppercase tracking-wider">Project Goals</label>
              <textarea
                className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-neon-purple/50 transition resize-none"
                rows={4}
                placeholder="Tell us about your vision..."
                value={formData.goals}
                onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
              />
            </div>

            <Button variant="neon" size="lg" className="w-full">
              <Send className="w-4 h-4" />
              Book Intro Call
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              We specialize in high-impact sites for local businesses—restaurants, gyms, salons, real estate, and more.
            </p>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
