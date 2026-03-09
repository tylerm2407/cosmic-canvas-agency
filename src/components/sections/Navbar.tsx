import { useLocation } from "react-router-dom";
import PillNav from "@/components/PillNav";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Websites", href: "/websites" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex items-start justify-center gap-2 pointer-events-none">
      <div className="pointer-events-auto">
        <PillNav
          items={navItems}
          activeHref={location.pathname}
          ease="power2.easeOut"
          baseColor="#000000"
          pillColor="#ffffff"
          hoveredPillTextColor="#000000"
          pillTextColor="#000000"
          initialLoadAnimation={false}
        />
      </div>
      <div className="pointer-events-auto mt-[1em] bg-black/80 backdrop-blur-sm rounded-full px-3 py-2 hidden md:flex">
        <ThemeToggle />
      </div>
    </div>
  );
}
