import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Connect Wallet",
      description: "Connect your Web3 wallet to get started on your partnership journey.",
      color: "text-primary"
    },
    {
      step: "02", 
      title: "Make Investment",
      description: "Invest just $5 to secure your equal partnership position among 100,000 partners.",
      color: "text-accent"
    },
    {
      step: "03",
      title: "Receive NFT",
      description: "Get your permanent ownership certificate as an NFT proving your partnership.",
      color: "text-gold"
    },
    {
      step: "04",
      title: "Start Earning",
      description: "Begin earning $1 for each person you refer, plus lifetime profit sharing.",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-primary">How It</span>{" "}
            <span className="text-gradient-gold">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Four simple steps to become a foundation partner and start earning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((stepItem, index) => (
            <div key={index} className="relative">
              <Card className="card-glow p-6 text-center h-full hover:scale-105 transition-all duration-300">
                <div className="mb-6">
                  <div className={`text-4xl font-bold ${stepItem.color} mb-2`}>
                    {stepItem.step}
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-12 mx-auto"></div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  {stepItem.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {stepItem.description}
                </p>
              </Card>
              
              {/* Arrow connector for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="card-glow p-8 max-w-3xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5">
            <h3 className="text-2xl font-bold mb-4 text-gradient-primary">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Join thousands of partners who are already building the future of decentralized platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-sm text-muted-foreground">
                Only <span className="text-primary font-semibold">$5</span> to become a foundation partner
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;