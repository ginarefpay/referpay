import HeroSection from "@/components/HeroSection";
import VisionSection from "@/components/VisionSection";
import ValueSection from "@/components/ValueSection";
import DAppSection from "@/components/DAppSection";

const Index = () => {
  const scrollToDApp = () => {
    const dappSection = document.getElementById('dapp');
    if (dappSection) {
      dappSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onGetStarted={scrollToDApp} />
      <VisionSection />
      <ValueSection />
      <DAppSection />
    </div>
  );
};

export default Index;
