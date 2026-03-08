import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Gallery from "@/components/sections/Gallery";
import Experience from "@/components/sections/Experience";
import Results from "@/components/sections/Results";
import Process from "@/components/sections/Process";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      <Navbar />

      <main className="pt-16">
        <Hero />
        <TrustBar />
        <Gallery />
        <Experience />
        <Results />
        <Process />
        <Pricing />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
