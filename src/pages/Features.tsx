
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  Shield, 
  Zap, 
  Users, 
  BarChart3,
  Wallet,
  Globe,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  const coreFeatures = [
    {
      icon: <DollarSign className="h-8 w-8 text-green-500" />,
      title: "Instant USDC Rewards",
      description: "Earn $1 USDC immediately for each successful referral. No delays, no processing - instant blockchain payments.",
      benefits: ["$1 per referral", "Instant payments", "USDC cryptocurrency", "No minimum payout"]
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Blockchain Verification",
      description: "Every transaction is recorded and verified on Polygon blockchain. Complete transparency and immutable records.",
      benefits: ["On-chain verification", "Immutable records", "Full transparency", "Audit trail"]
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-500" />,
      title: "Real-time Tracking",
      description: "Monitor your referrals and earnings in real-time with live blockchain data integration.",
      benefits: ["Live data updates", "Real-time notifications", "Instant confirmation", "24/7 monitoring"]
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Growing Network",
      description: "Join thousands of partners in the world's most transparent referral network.",
      benefits: ["10,000+ partners", "Global community", "Networking opportunities", "Shared growth"]
    }
  ];

  const technicalFeatures = [
    {
      icon: <Wallet className="h-6 w-6 text-primary" />,
      title: "MetaMask Integration",
      description: "Seamless wallet connection with MetaMask and other Web3 wallets"
    },
    {
      icon: <Globe className="h-6 w-6 text-secondary" />,
      title: "Polygon Network",
      description: "Fast, low-cost transactions on Ethereum's most popular L2"
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-green-500" />,
      title: "Analytics Dashboard",
      description: "Comprehensive analytics and reporting for your referral activity"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-blue-500" />,
      title: "Smart Contracts",
      description: "Audited smart contracts ensuring security and reliability"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-gradient-primary">Powerful</span>
            <span className="text-gradient-gold"> Features</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Everything you need to build a successful referral business on the blockchain
          </p>
          <Badge variant="secondary" className="text-sm px-4 py-2">
            Built for Web3 • Verified on Polygon
          </Badge>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient-primary">
            Core Features
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient-primary">
            Technical Excellence
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalFeatures.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Process */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient-primary">
            Simple 3-Step Process
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect & Join",
                description: "Connect your MetaMask wallet and join with 5 USDC to become a founding partner",
                icon: <Wallet className="h-8 w-8 text-primary" />
              },
              {
                step: "02", 
                title: "Share Your Link",
                description: "Get your unique referral link and share it with your network through any channel",
                icon: <Users className="h-8 w-8 text-secondary" />
              },
              {
                step: "03",
                title: "Earn Rewards",
                description: "Receive $1 USDC instantly for each person who joins through your referral link",
                icon: <DollarSign className="h-8 w-8 text-green-500" />
              }
            ].map((item, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader className="text-center">
                  <div className="text-4xl font-bold text-muted-foreground/20 mb-2">
                    {item.step}
                  </div>
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-gradient-gold">
            Ready to Experience These Features?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of partners already earning with ReferPay's powerful platform
          </p>
          <Link to="/">
            <Button size="lg" className="btn-glow-primary text-lg px-8 py-4 h-auto">
              <Users className="h-5 w-5 mr-2" />
              Get Started Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Features;
