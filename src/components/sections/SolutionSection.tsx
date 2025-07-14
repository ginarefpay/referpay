import { FileText, Star, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";

const SolutionSection = () => {
  const steps = [
    {
      icon: FileText,
      title: "Register Your Idea",
      description: "Transform your idea into a unique 'digital asset' (NFT) that protects intellectual property rights and proves your priority in invention",
      color: "text-primary"
    },
    {
      icon: Star,
      title: "Value Your Asset",
      description: "Our community of experts and investors evaluates your idea and determines its real market value",
      color: "text-accent"
    },
    {
      icon: Coins,
      title: "Get Instant Funding",
      description: "You can offer shares of your idea as digital assets to investors and get the necessary funding instantly",
      color: "text-gold"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient-primary">The Solution: ReferPay</span>
              <br />
              <span className="text-gradient-gold">Where Ideas Never Die</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A revolutionary digital platform that transforms your ideas into tradeable and investable assets
            </p>
          </div>

          {/* 3-Step Process */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="card-glow p-8 rounded-xl text-center hover-lift">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${step.color} bg-gradient-to-r from-primary/10 to-accent/10`}>
                  <step.icon className={`h-8 w-8 ${step.color}`} />
                </div>
                
                <div className="mb-4 text-sm font-bold text-primary">
                  Step {index + 1}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-gradient-primary">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Button 
              size="lg"
              className="btn-glow-accent text-lg px-12 py-6"
            >
              Start Your Journey Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;