import { FileText, Star, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";

const SolutionSection = () => {
  const steps = [
    {
      icon: FileText,
      title: "سجّل فكرتك",
      description: "حوّل فكرتك إلى 'أصل رقمي' فريد (NFT) يحمي حقوق الملكية الفكرية ويثبت أولويتك في الاختراع",
      color: "text-primary"
    },
    {
      icon: Star,
      title: "قيّم أصلك",
      description: "مجتمعنا المكون من الخبراء والمستثمرين يقوم بتقييم فكرتك وتحديد قيمتها الحقيقية في السوق",
      color: "text-accent"
    },
    {
      icon: Coins,
      title: "احصل على تمويل فوري",
      description: "يمكنك عرض حصص من فكرتك كأصول رقمية للمستثمرين والحصول على التمويل اللازم فوراً",
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
              <span className="text-gradient-primary">الحل: ReferPay</span>
              <br />
              <span className="text-gradient-gold">حيث لا تموت الأفكار</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              منصة رقمية ثورية تحول أفكارك إلى أصول قابلة للتداول والاستثمار
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
                  الخطوة {index + 1}
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
              ابدأ رحلتك الآن
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;