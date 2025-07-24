import { Card } from "@/components/ui/card";
import { FileText, DollarSign, TrendingUp, Heart } from "lucide-react";

const ValueSection = () => {
  const benefits = [
    {
      icon: FileText,
      title: "Eternal Title Deed (NFT)",
      description: "Instantly receive a title deed that proves your share forever.",
      gradient: "text-gradient-primary"
    },
    {
      icon: DollarSign,
      title: "Instant Profit Engine",
      description: "For every person who joins through you, you get $1 directly and instantly in your wallet.",
      gradient: "text-gradient-accent"
    },
    {
      icon: TrendingUp,
      title: "Permanent Share of Profits",
      description: "Receive a percentage of the platform's future profits for life.",
      gradient: "text-gradient-gold"
    },
    {
      icon: Heart,
      title: "Positive Impact",
      description: "Contribute to building a tool that serves humanity and gives opportunities to creators around the world.",
      gradient: "text-gradient-primary"
    }
  ];

  return (
    <section className="py-24 px-6 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-gradient-primary">The Partner-Contributor</span>{" "}
            <span className="text-gradient-gold">Package.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card key={index} className="card-glow p-8 text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                </div>
                
                <h3 className={`text-xl font-bold mb-4 ${benefit.gradient}`}>
                  {benefit.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
