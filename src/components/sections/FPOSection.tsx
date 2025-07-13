import { Crown, Zap, Rocket, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FPOSection = () => {
  const tiers = [
    {
      id: 1,
      name: "Founder",
      icon: Crown,
      price: "0.1 ETH",
      supply: "250/1000",
      benefits: ["حقوق تصويت", "عوائد شهرية", "وصول مبكر", "شارة خاصة"],
      gradient: "from-gold to-yellow-400",
      glow: "glow-gold"
    },
    {
      id: 2,
      name: "Pioneer",
      icon: Zap,
      price: "0.05 ETH",
      supply: "500/2000",
      benefits: ["عوائد ربع سنوية", "وصول المنتج", "مجتمع خاص", "NFT حصري"],
      gradient: "from-primary to-primary-glow",
      glow: "glow-primary"
    },
    {
      id: 3,
      name: "Innovator",
      icon: Rocket,
      price: "0.025 ETH",
      supply: "1200/3000",
      benefits: ["تحديثات منتظمة", "وصول Beta", "دعم تقني", "شهادة رقمية"],
      gradient: "from-accent to-accent-glow",
      glow: "glow-accent"
    },
    {
      id: 4,
      name: "Supporter",
      icon: Gem,
      price: "0.01 ETH",
      supply: "2800/5000",
      benefits: ["نشرة إخبارية", "وصول محدود", "مجتمع عام", "NFT تذكاري"],
      gradient: "from-purple-500 to-pink-500",
      glow: "glow-primary"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient-gold">كيف تصبح شريكاً مؤسساً؟</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              اختر مستوى الشراكة الذي يناسبك واحصل على حصتك من مستقبل الابتكار
            </p>
            <Badge variant="outline" className="text-primary border-primary/50">
              عرض محدود - الكمية محدودة
            </Badge>
          </div>

          {/* Tiers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {tiers.map((tier) => (
              <div key={tier.id} className="card-glow p-6 rounded-xl hover-lift relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-5`} />
                
                {/* Tier Badge */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${tier.gradient}`}>
                      <tier.icon className="h-6 w-6 text-background" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Tier {tier.id}
                    </Badge>
                  </div>

                  {/* Tier Info */}
                  <h3 className="text-2xl font-bold mb-2 text-gradient-primary">
                    {tier.name}
                  </h3>
                  
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-gradient-gold mb-1">
                      {tier.price}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      متبقي: {tier.supply}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2 mb-6">
                    {tier.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                        {benefit}
                      </div>
                    ))}
                  </div>

                  {/* Mint Button */}
                  <Button 
                    className={`w-full btn-${tier.glow}`}
                    size="sm"
                  >
                    اشترِ الآن
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4 text-gradient-primary">
              لا تفوت الفرصة
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              كن جزءاً من ثورة الابتكار واحصل على عوائد مدى الحياة من أفكار المستقبل
            </p>
            <Button size="lg" className="btn-glow-gold">
              اكتشف المزيد عن الشراكة
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FPOSection;