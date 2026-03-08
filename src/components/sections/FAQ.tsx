import { useState } from "react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "How long does a typical project take?", a: "Most projects launch within 4–8 weeks. Complex 3D experiences may take up to 12 weeks. We'll give you a detailed timeline after our discovery call." },
  { q: "What's the typical cost range?", a: "Projects start in the low four figures for simple sites and go up for full 3D custom builds. We provide transparent proposals after understanding your needs." },
  { q: "Will the 3D elements slow down my website?", a: "Absolutely not. We use performance-optimized techniques like lazy loading, level-of-detail rendering, and code splitting to keep everything fast." },
  { q: "Do you handle SEO?", a: "Yes. Every site is built with SEO best practices: semantic HTML, fast load times, structured data, meta tags, and mobile-first design." },
  { q: "What about ongoing maintenance?", a: "All plans include post-launch support. We also offer ongoing retainers for continuous optimization, content updates, and new features." },
  { q: "Can you help with content and copywriting?", a: "We partner with expert copywriters who specialize in conversion-focused copy for local businesses. It's an optional add-on." },
  { q: "What platforms do you build on?", a: "We use modern frameworks like React and Next.js for maximum performance and flexibility. No WordPress templates here." },
  { q: "Do you work with businesses outside of our area?", a: "Absolutely. While we specialize in local businesses, we work with clients nationwide. Everything is handled remotely with regular video calls." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`glass-card transition-all duration-300 ${open ? "ring-1 ring-neon-purple/30" : ""}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left gap-4"
      >
        <span className="font-display font-semibold text-sm sm:text-base">{q}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="section-spacing relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm text-neon-cyan uppercase tracking-widest font-display mb-4">FAQ</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display">
            Common <span className="glow-text">Questions</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq) => (
            <StaggerItem key={faq.q}>
              <FaqItem q={faq.q} a={faq.a} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
