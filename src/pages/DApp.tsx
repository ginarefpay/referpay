
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { 
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { useEnhancedBlockchainData } from "@/hooks/useEnhancedBlockchainData";
import { usePolygonNetwork } from "@/hooks/usePolygonNetwork";
import WalletConnect from "@/components/dapp/WalletConnect";
import ParticipationForm from "@/components/dapp/ParticipationForm";
import EnhancedPartnerDashboard from "@/components/dapp/dashboard/EnhancedPartnerDashboard";

const DApp = () => {
  const navigate = useNavigate();
  
  const {
    connectedWallet,
    userState,
    isConnecting,
    hasEverConnected,
    contractInfo,
    walletBalances,
    partnerVerification,
    referralStats,
    referrerAddress,
    referralLink,
    isProcessing,
    isLoadingContract,
    isLoadingUser,
    actions
  } = useEnhancedBlockchainData();

  const {
    isPolygonNetwork,
    isCheckingNetwork,
    handleSwitchToPolygon,
    ensurePolygonNetwork
  } = usePolygonNetwork();

  // Redirect to home if no wallet connection attempt has been made
  useEffect(() => {
    if (!connectedWallet && !hasEverConnected && !isConnecting) {
      navigate("/");
    }
  }, [connectedWallet, hasEverConnected, isConnecting, navigate]);

  const handleConnectWallet = async () => {
    const networkOk = await ensurePolygonNetwork();
    if (networkOk) {
      await actions.connectWallet();
    }
  };

  const handleParticipate = async () => {
    const networkOk = await ensurePolygonNetwork();
    if (networkOk) {
      await actions.participate();
    }
  };

  // Network warning banner
  const renderNetworkWarning = () => {
    if (isCheckingNetwork) {
      return (
        <Card className="mb-6 border-yellow-500/20 bg-yellow-500/10">
          <CardContent className="flex items-center gap-3 py-4">
            <LoadingSpinner size="sm" />
            <span className="text-sm">Checking network connection...</span>
          </CardContent>
        </Card>
      );
    }

    if (!isPolygonNetwork && connectedWallet) {
      return (
        <Card className="mb-6 border-destructive/20 bg-destructive/10">
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <p className="font-medium text-destructive">Wrong Network</p>
                <p className="text-sm text-muted-foreground">
                  Please switch to Polygon network to access all features
                </p>
              </div>
            </div>
            <Button 
              onClick={handleSwitchToPolygon}
              variant="outline"
              size="sm"
            >
              Switch to Polygon
            </Button>
          </CardContent>
        </Card>
      );
    }

    if (isPolygonNetwork && connectedWallet) {
      return (
        <Card className="mb-6 border-green-500/20 bg-green-500/10">
          <CardContent className="flex items-center gap-3 py-3">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-600">Connected to Polygon network</span>
          </CardContent>
        </Card>
      );
    }

    return null;
  };

  const renderMainContent = () => {
    // Show wallet connect if not connected
    if (!connectedWallet) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card/50 to-background">
          <div className="container mx-auto px-6 max-w-md">
            <WalletConnect onConnect={handleConnectWallet} />
          </div>
        </div>
      );
    }

    // Show loading while checking user status
    if (userState === 'checking' || isLoadingUser) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card/50 to-background">
          <div className="text-center">
            <LoadingSpinner size="lg" text="Loading your blockchain data..." />
            <p className="mt-4 text-muted-foreground">
              Analyzing your wallet and partnership status...
            </p>
          </div>
        </div>
      );
    }

    // Show participation form for new users
    if (userState === 'new_user') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-card/50 to-background">
          <div className="container mx-auto px-6 py-8 max-w-4xl">
            <div className="pt-16">
              {renderNetworkWarning()}
              <ParticipationForm
                connectedWallet={connectedWallet}
                referrerAddress={referrerAddress}
                setReferrerAddress={actions.setReferrerAddress}
                contractInfo={contractInfo}
                isProcessing={isProcessing}
                onParticipate={handleParticipate}
              />
            </div>
          </div>
        </div>
      );
    }

    // Show enhanced partner dashboard for verified partners
    if (userState === 'partner') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-card/50 to-background">
          <div className="container mx-auto px-6 py-8 max-w-7xl">
            <div className="pt-16">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-gradient-primary">ReferPay</span>
                  <span className="text-gradient-gold"> Professional Dashboard</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Real-time blockchain data • Verified earnings • Professional partnership management
                </p>
              </div>

              {renderNetworkWarning()}

              <EnhancedPartnerDashboard
                walletAddress={connectedWallet}
                contractInfo={contractInfo}
                walletBalances={walletBalances}
                partnerVerification={partnerVerification}
                referralStats={referralStats}
                referralLink={referralLink}
              />
            </div>
          </div>
        </div>
      );
    }

    // Fallback
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card/50 to-background">
        <div className="container mx-auto px-6 max-w-md">
          <WalletConnect onConnect={handleConnectWallet} />
        </div>
      </div>
    );
  };

  return renderMainContent();
};

export default DApp;
