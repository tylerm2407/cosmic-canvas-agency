import { useMemo } from "react";
import Navbar from "@/components/sections/Navbar";
import Pricing from "@/components/sections/Pricing";
import Footer from "@/components/sections/Footer";
import Hyperspeed from "@/components/Hyperspeed";

const PricingPage = () => {
  const effectOptions = useMemo(() => ({
    distortion: "turbulentDistortion" as const,
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5] as [number, number],
    lightStickHeight: [1.3, 1.7] as [number, number],
    movingAwaySpeed: [60, 80] as [number, number],
    movingCloserSpeed: [-120, -160] as [number, number],
    carLightsLength: [12, 80] as [number, number],
    carLightsRadius: [0.05, 0.14] as [number, number],
    carWidthPercentage: [0.3, 0.5] as [number, number],
    carShiftX: [-0.8, 0.8] as [number, number],
    carFloorSeparation: [0, 5] as [number, number],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
      rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
      sticks: 0x03b3c3,
    },
  }), []);

  return (
    <div className="min-h-screen relative bg-black">
      {/* Hyperspeed Background */}
      <div className="fixed inset-0 z-0">
        <Hyperspeed effectOptions={effectOptions} />
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
