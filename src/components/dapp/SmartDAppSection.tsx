
import { Card } from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import WalletConnect from "./WalletConnect";
import EnhancedPartnerDashboard from "./EnhancedPartnerDashboard";
import ParticipationForm from "./ParticipationForm";
import NFTDisplay from "./NFTDisplay";
import ContractStats from "./ContractStats";
import { useLiveBlockchainData } from "@/hooks/useLiveBlockchainData";

const SmartDAppSection = () => {
  const {
    connectedWallet,
    userState,
    isConnecting,
    hasEverConnected,
    contractInfo,
    walletBalances,
    referralStats,
    referrerAddress,
    referralLink,
    isProcessing,
    isLoadingContract,
    isLoadingUser,
    actions
  } = useLiveBlockchainData();

  const renderMainContent = () => {
    // Show wallet connect button only if never connected
    if (!hasEverConnected && userState === 'disconnected') {
      return <WalletConnect onConnect={actions.connectWallet} />;
    }
    
    // Show loading while checking user status
    if (userState === 'checking' || isLoadingUser) {
      return (
        <div className="text-center py-12">
          <LoadingSpinner size="lg" text="Loading your live blockchain data..." />
        </div>
      );
    }
    
    // Show enhanced partner dashboard for partners
    if (userState === 'partner') {
      return (
        <EnhancedPartnerDashboard
          walletAddress={connectedWallet}
          contractInfo={contractInfo}
          walletBalances={walletBalances}
          referralStats={referralStats}
          referralLink={referralLink}
        />
      );
    }
    
    // Show participation form for new users
    if (userState === 'new_user') {
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
    }
    
    // Fallback to connect wallet
    return <WalletConnect onConnect={actions.connectWallet} />;
  };

  return (
    <section className="py-24 px-6" id="dapp">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-gradient-primary">Professional Partner Experience</span>
            <br />
            <span className="text-gradient-gold">Live Data • AI Tools • Earning Opportunities</span>
          </h2>
          
          <ContractStats contractInfo={contractInfo} isLoading={isLoadingContract} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* NFT Display - Always visible */}
          <div className="order-2 lg:order-1">
            <NFTDisplay />
          </div>

          {/* Smart Interface - Changes based on user state */}
          <div className="order-1 lg:order-2 lg:col-span-2 space-y-6">
            <Card className="card-glow p-8">
              {isConnecting && (
                <div className="text-center py-8">
                  <LoadingSpinner size="lg" text="Connecting wallet..." />
                </div>
              )}
              
              {!isConnecting && renderMainContent()}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartDAppSection;
