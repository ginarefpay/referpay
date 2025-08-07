
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Target,
  Bot,
  ExternalLink,
  Fuel,
  Coins
} from "lucide-react";
import { WalletBalances } from "@/lib/web3/wallet-balances";
import { ReferralStats } from "@/lib/web3/referral-analyzer";
import { LiveContractInfo, FOUNDING_PARTNERS_TARGET } from "@/lib/web3/live-contract-data";
import LivePartnerData from "./dashboard/LivePartnerData";
import MissionsRewards from "./dashboard/MissionsRewards";
import GinaAISuite from "./dashboard/GinaAISuite";

interface EnhancedPartnerDashboardProps {
  walletAddress: string;
  contractInfo: LiveContractInfo;
  walletBalances: WalletBalances;
  referralStats: ReferralStats;
  referralLink: string;
}

const EnhancedPartnerDashboard = ({ 
  walletAddress, 
  contractInfo,
  walletBalances,
  referralStats, 
  referralLink 
}: EnhancedPartnerDashboardProps) => {
  const openPolygonscan = () => {
    window.open(`https://polygonscan.com/address/${walletAddress}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Award className="h-10 w-10 text-gradient-gold" />
          <h1 className="text-4xl font-bold text-gradient-primary">
            Professional Dashboard
          </h1>
        </div>
        <p className="text-lg text-muted-foreground mb-4">
          Complete Partner Experience • Live Blockchain Data • AI-Powered Tools
        </p>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="secondary" className="text-sm px-4 py-2">
            {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={openPolygonscan}
            className="h-8 w-8 p-0"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              Total Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              ${referralStats.totalEarnings.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              Referrals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {referralStats.totalReferrals}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Fuel className="h-4 w-4 text-purple-500" />
              POL Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-purple-500">
              {walletBalances.pol.toFixed(3)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Coins className="h-4 w-4 text-yellow-500" />
              USDC Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-yellow-500">
              ${walletBalances.usdc.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="live-data" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger value="live-data" className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4" />
            Live Partner Data
          </TabsTrigger>
          <TabsTrigger value="missions" className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4" />
            Missions & Rewards
          </TabsTrigger>
          <TabsTrigger value="gina-ai" className="flex items-center gap-2 text-sm">
            <Bot className="h-4 w-4" />
            Gina AI Suite
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live-data">
          <LivePartnerData
            walletAddress={walletAddress}
            contractInfo={contractInfo}
            walletBalances={walletBalances}
            referralStats={referralStats}
            referralLink={referralLink}
          />
        </TabsContent>

        <TabsContent value="missions">
          <MissionsRewards walletAddress={walletAddress} />
        </TabsContent>

        <TabsContent value="gina-ai">
          <GinaAISuite walletAddress={walletAddress} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedPartnerDashboard;
