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
    <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-0 mt-[1em]">
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
        <div className="bg-black/80 backdrop-blur-sm rounded-full p-2 ml-1 cursor-pointer">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
