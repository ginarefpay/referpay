
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Import all sections
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import FPOSection from "@/components/sections/FPOSection";
import VisionSection from "@/components/VisionSection";
import AboutSection from "@/components/sections/AboutSection";
import DAppSection from "@/components/DAppSection";

const Index = () => {
  const location = useLocation();

  // Legacy scroll-to-section functionality for existing bookmarks/links
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FPOSection />
      <VisionSection />
      <AboutSection />
      <DAppSection />
    </div>
  );
};

export default Index;
