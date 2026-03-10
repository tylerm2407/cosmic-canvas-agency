import { useRef } from "react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { motion } from "framer-motion";

const projects = [
  {
    category: "Restaurants & Cafés",
    outcome: "Booked-out Fridays for a neighborhood café",
    color: "from-purple-700 to-violet-900",
    bars: ["w-20", "w-32", "w-16"],
    btnColor: "bg-purple-400/40",
  },
  {
    category: "Gyms & Fitness Studios",
    outcome: "3× membership sign-ups in 30 days",
    color: "from-blue-700 to-cyan-800",
    bars: ["w-28", "w-20", "w-24"],
    btnColor: "bg-cyan-400/40",
  },
  {
    category: "Salons & Spas",
    outcome: "Online bookings doubled overnight",
    color: "from-fuchsia-700 to-purple-900",
    bars: ["w-16", "w-28", "w-20"],
    btnColor: "bg-fuchsia-400/40",
  },
  {
    category: "Real Estate & Rentals",
    outcome: "40% more property inquiries in a month",
    color: "from-teal-700 to-blue-900",
    bars: ["w-24", "w-16", "w-28"],
    btnColor: "bg-teal-400/40",
  },
  {
    category: "Retail & Boutiques",
    outcome: "First e-commerce month: $12k revenue",
    color: "from-violet-700 to-fuchsia-900",
    bars: ["w-20", "w-24", "w-16"],
    btnColor: "bg-violet-400/40",
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
          <p className="text-muted-foreground mt-4 max-w-lg">
            We've helped businesses across industries stand out online. Here's the kind of work we do.
          </p>
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
              {/* Mock browser window */}
              <div
                className={`h-48 rounded-xl bg-gradient-to-br ${project.color} relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]`}
              >
                {/* Browser chrome */}
                <div className="absolute top-0 inset-x-0 h-7 bg-black/40 backdrop-blur-sm flex items-center px-3 gap-1.5 border-b border-white/10">
                  <div className="w-2 h-2 rounded-full bg-red-400/70" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
                  <div className="w-2 h-2 rounded-full bg-green-400/70" />
                  <div className="ml-2 flex-1 h-3.5 rounded bg-white/10 max-w-[120px]" />
                </div>
                {/* Page content mock */}
                <div className="absolute inset-0 top-7 p-4 space-y-2">
                  <div className="h-6 w-3/4 rounded bg-white/20" />
                  <div className={`h-2.5 ${project.bars[0]} rounded bg-white/15`} />
                  <div className={`h-2.5 ${project.bars[1]} rounded bg-white/10`} />
                  <div className={`h-2.5 ${project.bars[2]} rounded bg-white/10`} />
                  <div className="flex gap-2 mt-3">
                    <div className={`h-7 w-20 rounded ${project.btnColor} group-hover:animate-pulse`} />
                    <div className="h-7 w-14 rounded bg-white/10" />
                  </div>
                  <div className="absolute bottom-3 right-3 w-16 h-12 rounded bg-white/10" />
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
