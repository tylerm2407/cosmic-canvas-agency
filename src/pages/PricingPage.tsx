import Navbar from "@/components/sections/Navbar";
import Pricing from "@/components/sections/Pricing";
import Footer from "@/components/sections/Footer";
import LiquidChrome from "@/components/LiquidChrome";

const PricingPage = () => {
  return (
    <div className="min-h-screen relative">
      {/* LiquidChrome Background */}
      <div className="fixed inset-0 w-full h-full">
        <LiquidChrome
          baseColor={[0.1, 0.1, 0.1]}
          speed={1}
          amplitude={0.6}
          interactive={true}
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-background/60 z-[1]" />
      </div>

      <div className="noise-overlay" />

      <Navbar />

      <main className="pt-16 relative z-10">
        <Pricing />
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;
