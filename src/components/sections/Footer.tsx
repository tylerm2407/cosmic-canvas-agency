import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <Zap className="w-5 h-5 text-neon-purple" />
            <span>Dimension</span>
          </div>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Home</a>
            <a href="#experience" className="hover:text-foreground transition-colors">Work</a>
            <a href="#process" className="hover:text-foreground transition-colors">Process</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>

          <p className="text-xs text-muted-foreground text-center sm:text-right max-w-xs">
            Custom websites for local businesses that deserve more than a template.
          </p>
        </div>
      </div>
    </footer>
  );
}
