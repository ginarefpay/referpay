
import HeroSection from "@/components/HeroSection";
import VisionSection from "@/components/VisionSection";
import ValueSection from "@/components/ValueSection";
import SmartDAppSection from "@/components/dapp/SmartDAppSection";
import AboutSection from "@/components/sections/AboutSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import FPOSection from "@/components/sections/FPOSection";
import Layout from "@/components/layout/Layout";

const Index = () => {
  const handleNavigation = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const scrollToDApp = () => {
    handleNavigation('dapp');
  };

  return (
    <Layout onNavigate={handleNavigation}>
      <section id="hero">
        <HeroSection onGetStarted={scrollToDApp} />
      </section>
      <section id="problem">
        <ProblemSection />
      </section>
      <section id="solution">
        <SolutionSection />
      </section>
      <section id="fpo">
        <FPOSection />
      </section>
      <section id="vision">
        <VisionSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="how-it-works">
        <HowItWorksSection />
      </section>
      <section id="value">
        <ValueSection />
      </section>
      <section id="dapp">
        <SmartDAppSection />
      </section>
    </Layout>
  );
};

export default Index;
