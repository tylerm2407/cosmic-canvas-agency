import { Zap, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border/20 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
              <Zap className="w-5 h-5 text-neon-purple" />
              <span>Cosmic Canvas</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Custom websites that turn local businesses into unforgettable online experiences.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <p className="text-xs font-display uppercase tracking-widest text-muted-foreground">Navigation</p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors w-fit">Home</Link>
              <Link to="/websites" className="hover:text-foreground transition-colors w-fit">Websites</Link>
              <Link to="/pricing" className="hover:text-foreground transition-colors w-fit">Pricing</Link>
              <Link to="/contact" className="hover:text-foreground transition-colors w-fit">Contact</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <p className="text-xs font-display uppercase tracking-widest text-muted-foreground">Get in Touch</p>
            <a
              href="mailto:hello@cosmiccanvas.agency"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
            >
              <Mail className="w-4 h-4" />
              hello@cosmiccanvas.agency
            </a>
            <p className="text-xs text-muted-foreground">
              Free consultation &middot; 1–2 week delivery
            </p>
          </div>
        </div>

        <div className="border-t border-border/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Cosmic Canvas. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with the same craft we bring to every client.
          </p>
        </div>
      </div>
    </footer>
  );
}
