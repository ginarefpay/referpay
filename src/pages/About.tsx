
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Users, 
  DollarSign, 
  Shield,
  Zap,
  Globe
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-gradient-primary">About</span>
            <span className="text-gradient-gold"> ReferPay</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Building the future of transparent, blockchain-verified referral marketing
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gradient-primary">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                ReferPay revolutionizes referral marketing by leveraging blockchain technology 
                to create a completely transparent, instant, and trustless reward system.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                We believe that referral partnerships should be simple, transparent, and 
                immediately rewarding. That's why every referral is tracked on the Polygon 
                blockchain and rewards are paid instantly in USDC.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Blockchain Verified</Badge>
                <Badge variant="secondary">Instant Payments</Badge>
                <Badge variant="secondary">100% Transparent</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">10K+</div>
                  <p className="text-sm text-muted-foreground">Partners</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">$50K+</div>
                  <p className="text-sm text-muted-foreground">Paid Out</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Shield className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">100%</div>
                  <p className="text-sm text-muted-foreground">Verified</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Zap className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">Instant</div>
                  <p className="text-sm text-muted-foreground">Rewards</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient-primary">
            How ReferPay Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>1. Join as Partner</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect your wallet and mint your founding partner NFT for just 5 USDC. 
                  This gives you access to the referral program and your unique referral link.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>2. Share & Refer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Share your personalized referral link with friends, family, and your network. 
                  When they join using your link, both you and they benefit from the partnership.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>3. Earn Instantly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive $1 USDC immediately when your referral joins. All payments are 
                  automated and verified on the Polygon blockchain - no waiting periods.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8 text-gradient-primary">
            Built on Polygon
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            ReferPay is built on the Polygon blockchain, ensuring fast, low-cost transactions 
            and complete transparency. Every referral, every payment, and every interaction 
            is recorded on-chain for full auditability.
          </p>
          <div className="flex justify-center items-center gap-8">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <span>Polygon Network</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span>Smart Contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-500" />
              <span>USDC Payments</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
