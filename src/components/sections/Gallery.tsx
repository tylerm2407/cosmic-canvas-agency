import { useRef } from "react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { motion } from "framer-motion";

const projects = [
  {
    category: "Restaurants & Cafés",
    outcome: "Booked-out Fridays for a neighborhood café",
    color: "from-neon-purple to-neon-violet",
    accent: "neon-purple",
  },
  {
    category: "Gyms & Studios",
    outcome: "3x membership sign-ups in 30 days",
    color: "from-neon-blue to-neon-cyan",
    accent: "neon-blue",
  },
  {
    category: "Salons & Spas",
    outcome: "Online bookings doubled overnight",
    color: "from-neon-fuchsia to-neon-purple",
    accent: "neon-fuchsia",
  },
  {
    category: "Real Estate & Rentals",
    outcome: "40% more property inquiries in a month",
    color: "from-neon-cyan to-neon-blue",
    accent: "neon-cyan",
  },
  {
    category: "Retail & Boutiques",
    outcome: "First e-commerce month: $12k revenue",
    color: "from-neon-violet to-neon-fuchsia",
    accent: "neon-violet",
  },
];

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 radial-glow-center" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
        <AnimatedSection>
          <p className="text-sm text-neon-cyan uppercase tracking-widest font-display mb-4">Our Work</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display">
            What We <span className="glow-text">Build</span>
          </h2>
        </AnimatedSection>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-4 sm:px-8 pb-8 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.category}
            className="snap-center shrink-0 w-[320px] sm:w-[360px] group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="glass-card-hover p-1 h-full">
              {/* Mock website preview */}
              <div
                className={`h-48 rounded-xl bg-gradient-to-br ${project.color} relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]`}
                style={{ perspective: "800px" }}
              >
                {/* Fake UI elements */}
                <div className="absolute inset-4 rounded-lg bg-background/20 backdrop-blur-sm border border-foreground/10 p-3 space-y-2">
                  <div className="h-2 w-16 rounded-full bg-foreground/30" />
                  <div className="h-2 w-24 rounded-full bg-foreground/20" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-6 w-16 rounded bg-foreground/25 group-hover:animate-pulse" />
                    <div className="h-6 w-12 rounded bg-foreground/15" />
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-display font-bold text-lg">{project.category}</h3>
                <p className="text-sm text-muted-foreground">{project.outcome}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
