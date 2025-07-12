import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="hero-bg min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <img 
            src="/lovable-uploads/633f9e66-854c-4ba9-a849-fa17dbb293ba.png" 
            alt="ReferPay.org Logo" 
            className="h-32 w-auto float-animation"
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-gradient-primary">Invest in a huge,</span>
          <br />
          <span className="text-gradient-accent">secure project,</span>
          <br />
          <span className="text-gradient-gold">for a very small amount.</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Your chance to be part of the foundation. <span className="text-primary font-semibold">Now.</span>
        </p>

        {/* CTA Button */}
        <Button 
          onClick={onGetStarted}
          size="lg"
          className="btn-glow-primary text-lg px-12 py-6 mb-16 pulse-glow"
        >
          Become a Partner-Contributor Now
        </Button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;