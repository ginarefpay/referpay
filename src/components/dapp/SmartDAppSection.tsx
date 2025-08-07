
import { Card } from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import WalletConnect from "./WalletConnect";
import PartnerDashboard from "./PartnerDashboard";
import ParticipationForm from "./ParticipationForm";
import NFTDisplay from "./NFTDisplay";
import ContractStats from "./ContractStats";
import { useSmartUserExperience } from "@/hooks/useSmartUserExperience";

const SmartDAppSection = () => {
  const {
    connectedWallet,
    userState,
    isConnecting,
    contractInfo,
    userData,
    referralStats,
    referrerAddress,
    referralLink,
    isProcessing,
    isLoadingContract,
    isLoadingUser,
    actions
  } = useSmartUserExperience();

  const renderMainContent = () => {
    switch (userState) {
      case 'disconnected':
        return <WalletConnect onConnect={actions.connectWallet} />;
      
      case 'checking':
        return (
          <div className="text-center py-12">
            <LoadingSpinner size="lg" text="Checking your partnership status..." />
          </div>
        );
      
      case 'partner':
        return (
          <PartnerDashboard
            walletAddress={connectedWallet}
            userData={userData}
            referralStats={referralStats}
            referralLink={referralLink}
          />
        );
      
      case 'new_user':
        return (
          <ParticipationForm
            connectedWallet={connectedWallet}
            referrerAddress={referrerAddress}
            setReferrerAddress={actions.setReferrerAddress}
            contractInfo={contractInfo}
            isProcessing={isProcessing}
            onParticipate={actions.participate}
          />
        );
      
      default:
        return <WalletConnect onConnect={actions.connectWallet} />;
    }
  };

  return (
    <section className="py-24 px-6" id="dapp">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-gradient-primary">One Link</span>
            <br />
            <span className="text-gradient-gold">Instant Access, Personalized Experience</span>
          </h2>
          
          <ContractStats contractInfo={contractInfo} isLoading={isLoadingContract} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* NFT Display - Always visible */}
          <div className="order-2 lg:order-1">
            <NFTDisplay />
          </div>

          {/* Smart Interface - Changes based on user state */}
          <div className="order-1 lg:order-2 space-y-6">
            <Card className="card-glow p-8">
              {isConnecting && (
                <div className="text-center py-8">
                  <LoadingSpinner size="lg" text="Connecting wallet..." />
                </div>
              )}
              
              {!isConnecting && renderMainContent()}
            </Card>
            
            {/* Additional loading overlay for user data */}
            {isLoadingUser && userState !== 'checking' && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center rounded-lg">
                <LoadingSpinner size="lg" text="Loading your data..." />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartDAppSection;
