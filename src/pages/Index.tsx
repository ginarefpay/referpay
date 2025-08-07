
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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

  const handleGetStarted = () => {
    navigate("/partnership");
  };

  return (
    <div className="min-h-screen">
      <HeroSection onGetStarted={handleGetStarted} />
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
