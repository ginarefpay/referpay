
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Wallet, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Shield,
  Zap,
  ArrowRight
} from "lucide-react";
import OnboardingModal from "@/components/onboarding/OnboardingModal";
import { useEnhancedBlockchainData } from "@/hooks/useEnhancedBlockchainData";
import { usePolygonNetwork } from "@/hooks/usePolygonNetwork";

const Home = () => {
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const { connectedWallet, actions } = useEnhancedBlockchainData();
  const { ensurePolygonNetwork } = usePolygonNetwork();

  const handleConnectWallet = async () => {
    const networkOk = await ensurePolygonNetwork();
    if (networkOk) {
      await actions.connectWallet();
      // Redirect to dapp after successful connection
      navigate('/dapp');
    }
  };

  const handleBecomePartner = () => {
    if (connectedWallet) {
      navigate('/dapp');
    } else {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    handleConnectWallet();
  };

  const features = [
    {
      icon: <DollarSign className="h-8 w-8 text-green-500" />,
      title: "Earn $1 Per Referral",
      description: "Get instant USDC payments for every successful referral, verified on-chain"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Blockchain Verified",
      description: "All earnings tracked and verified directly on Polygon blockchain"
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-500" />,
      title: "Instant Payments",
      description: "No waiting periods - receive your referral rewards immediately"
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Growing Community",
      description: "Join thousands of partners building the future of referral marketing"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            {/* Main Headlines */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="text-gradient-primary">ReferPay</span>
                <br />
                <span className="text-gradient-gold">Partnership Program</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Join the world's first blockchain-verified referral network. 
                Earn $1 USDC instantly for every partner you refer - all payments tracked on Polygon.
              </p>
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="btn-glow-primary text-lg px-8 py-4 h-auto"
                onClick={handleBecomePartner}
              >
                <Users className="h-6 w-6 mr-3" />
                Become a Partner-Contributor Now
                <ArrowRight className="h-6 w-6 ml-3" />
              </Button>
              
              {!connectedWallet && (
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-lg px-8 py-4 h-auto"
                  onClick={() => setShowOnboarding(true)}
                >
                  <Wallet className="h-5 w-5 mr-2" />
                  Connect Wallet First
                </Button>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Polygon Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-500" />
                <span>Instant USDC Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <span>Real-time Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gradient-primary">
              Why Choose ReferPay?
            </h2>
            <p className="text-xl text-muted-foreground">
              The most transparent and reliable referral program in Web3
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-gradient-gold">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join now with just 5 USDC and start earning from your first referral
          </p>
          <Button 
            size="lg" 
            className="btn-glow-primary text-xl px-10 py-5 h-auto"
            onClick={handleBecomePartner}
          >
            <Users className="h-6 w-6 mr-3" />
            Get Started Now
            <ArrowRight className="h-6 w-6 ml-3" />
          </Button>
        </div>
      </section>

      {/* Onboarding Modal */}
      <OnboardingModal
        open={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
};

export default Home;
