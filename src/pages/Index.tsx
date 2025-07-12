import HeroSection from "@/components/HeroSection";
import VisionSection from "@/components/VisionSection";
import ValueSection from "@/components/ValueSection";
import DAppSection from "@/components/DAppSection";
import AboutSection from "@/components/sections/AboutSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
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
        <DAppSection />
      </section>
    </Layout>
  );
};

export default Index;
