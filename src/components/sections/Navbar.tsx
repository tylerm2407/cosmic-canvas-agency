import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "Websites", to: "/websites" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border/20">
      <div className="backdrop-blur-xl bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
            <Zap className="w-5 h-5 text-neon-purple" />
            <span>Dimension</span>
          </Link>

          <div className="hidden sm:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-display"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-3">
            <div className="sm:hidden">
              <ThemeToggle />
            </div>
            <Link
              to="/contact"
              className="btn-primary-glow text-primary-foreground font-display font-semibold text-sm px-5 py-2 rounded-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
