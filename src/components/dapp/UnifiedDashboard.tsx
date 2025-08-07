
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { 
  Wallet, 
  Users, 
  BarChart3, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Zap
} from "lucide-react";
import { useLiveBlockchainData } from "@/hooks/useLiveBlockchainData";
import { usePolygonNetwork } from "@/hooks/usePolygonNetwork";
import WalletConnect from "./WalletConnect";
import LiveDataDashboard from "./LiveDataDashboard";
import EnhancedReferralList from "@/components/dashboard/EnhancedReferralList";
import GinaAISuite from "./dashboard/GinaAISuite";
import ParticipationForm from "./ParticipationForm";

const UnifiedDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
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

  const {
    isPolygonNetwork,
    isCheckingNetwork,
    handleSwitchToPolygon,
    ensurePolygonNetwork
  } = usePolygonNetwork();

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
    if (!connectedWallet && !hasEverConnected) {
      return (
        <div className="text-center py-12">
          <WalletConnect onConnect={handleConnectWallet} />
        </div>
      );
    }

    // Show loading while checking user status
    if (userState === 'checking' || isLoadingUser) {
      return (
        <div className="text-center py-12">
          <LoadingSpinner size="lg" text="Loading your blockchain data..." />
        </div>
      );
    }

    // Show participation form for new users
    if (userState === 'new_user') {
      return (
        <div className="max-w-2xl mx-auto">
          <ParticipationForm
            connectedWallet={connectedWallet}
            referrerAddress={referrerAddress}
            setReferrerAddress={actions.setReferrerAddress}
            contractInfo={contractInfo}
            isProcessing={isProcessing}
            onParticipate={handleParticipate}
          />
        </div>
      );
    }

    // Show partner dashboard
    if (userState === 'partner') {
      return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="referrals" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Referrals</span>
            </TabsTrigger>
            <TabsTrigger value="ai-suite" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">AI Suite</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <LiveDataDashboard
              walletAddress={connectedWallet}
              contractInfo={contractInfo}
              walletBalances={walletBalances}
              referralStats={referralStats}
              referralLink={referralLink}
            />
          </TabsContent>

          <TabsContent value="referrals">
            <EnhancedReferralList walletAddress={connectedWallet} />
          </TabsContent>

          <TabsContent value="ai-suite">
            <GinaAISuite walletAddress={connectedWallet} />
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Wallet Address</h4>
                    <p className="text-sm text-muted-foreground font-mono">
                      {connectedWallet}
                    </p>
                  </div>
                  <Badge variant="secondary">Connected</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Network</h4>
                    <p className="text-sm text-muted-foreground">
                      {isPolygonNetwork ? 'Polygon Mainnet' : 'Wrong Network'}
                    </p>
                  </div>
                  <Badge variant={isPolygonNetwork ? "default" : "destructive"}>
                    {isPolygonNetwork ? 'Active' : 'Switch Required'}
                  </Badge>
                </div>

                <Button 
                  onClick={actions.refreshData}
                  className="w-full"
                  variant="outline"
                >
                  Refresh Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      );
    }

    // Fallback
    return (
      <div className="text-center py-12">
        <WalletConnect onConnect={handleConnectWallet} />
      </div>
    );
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-gradient-primary">ReferPay</span>
          <span className="text-gradient-gold"> Partnership Dashboard</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Real-time blockchain data • AI-powered tools • Professional partnership management
        </p>
      </div>

      {/* Network Status */}
      {renderNetworkWarning()}

      {/* Contract Stats */}
      <Card className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardHeader>
          <CardTitle className="text-center">Founding Partners Progress</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingContract ? (
            <div className="text-center">
              <LoadingSpinner size="sm" text="Loading contract data..." />
            </div>
          ) : (
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {contractInfo.totalSupply.toLocaleString()} / 100,000
              </div>
              <div className="w-full bg-secondary rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (contractInfo.totalSupply / 100000) * 100)}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {contractInfo.remainingSupply.toLocaleString()} positions remaining
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Content */}
      {renderMainContent()}
    </div>
  );
};

export default UnifiedDashboard;
