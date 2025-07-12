import { Card } from "@/components/ui/card";
import { Shield, Users, Globe, Zap } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const AboutSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver();
  const features = [
    {
      icon: Shield,
      title: "Secure & Transparent",
      description: "Built on blockchain technology with full transparency and security.",
      gradient: "text-gradient-primary"
    },
    {
      icon: Users,
      title: "Community Owned",
      description: "100% owned by 100,000 equal partners working together.",
      gradient: "text-gradient-accent"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Creating opportunities for creators and developers worldwide.",
      gradient: "text-gradient-gold"
    },
    {
      icon: Zap,
      title: "Instant Rewards",
      description: "Immediate returns on referrals with lifetime profit sharing.",
      gradient: "text-gradient-primary"
    }
  ];

  return (
    <section 
      ref={ref}
      className={`py-24 px-6 bg-secondary/30 section-fade ${isIntersecting ? 'visible' : ''}`}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-primary">Why Choose</span>{" "}
            <span className="text-gradient-gold">ReferPay?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join a revolutionary platform that puts ownership and profits back in the hands of the community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="card-glow p-6 text-center group hover:scale-105 transition-all duration-300">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                </div>
                
                <h3 className={`text-lg font-bold mb-3 ${feature.gradient}`}>
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Card className="card-glow p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gradient-accent">
              The Foundation Partnership
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              By investing just <span className="text-primary font-semibold">$5</span>, you become a 
              foundation partner in a revolutionary platform. This isn't just an investment – it's your 
              entry into a new era of decentralized ownership where <span className="text-gold font-semibold">everyone wins together</span>.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;