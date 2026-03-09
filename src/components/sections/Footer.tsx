import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
            <Zap className="w-5 h-5 text-neon-purple" />
            <span>Dimension</span>
          </Link>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/websites" className="hover:text-foreground transition-colors">Websites</Link>
            <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>

          <p className="text-xs text-muted-foreground text-center sm:text-right max-w-xs">
            Custom websites for local businesses that deserve more than a template.
          </p>
        </div>
      </div>
    </footer>
  );
}
