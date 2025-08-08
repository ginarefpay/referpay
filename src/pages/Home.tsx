
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import OnboardingModal from "@/components/onboarding/OnboardingModal";
import { useLiveBlockchainData } from "@/hooks/useLiveBlockchainData";

const Home = () => {
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const {
    connectedWallet,
    actions
  } = useLiveBlockchainData();

  const handleConnectWallet = async () => {
    await actions.connectWallet();
    // After successful connection, redirect to dapp
    if (connectedWallet) {
      navigate("/dapp");
    }
  };

  const handleGetStarted = () => {
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    // After onboarding, proceed with wallet connection
    handleConnectWallet();
  };

  return (
    <div className="min-h-screen">
      {/* Connect Wallet Button at the top */}
      <div className="fixed top-4 right-4 z-50">
        {!connectedWallet && (
          <Button 
            onClick={() => setShowOnboarding(true)}
            className="btn-glow-primary"
            size="sm"
          >
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
        )}
      </div>

      {/* Main Hero Section */}
      <HeroSection onGetStarted={handleGetStarted} />

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
