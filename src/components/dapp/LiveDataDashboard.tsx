
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Copy, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Share2, 
  Fuel,
  Coins,
  ExternalLink 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WalletBalances } from "@/lib/web3/wallet-balances";
import { ReferralStats } from "@/lib/web3/referral-analyzer";
import { LiveContractInfo, FOUNDING_PARTNERS_TARGET } from "@/lib/web3/live-contract-data";

interface LiveDataDashboardProps {
  walletAddress: string;
  contractInfo: LiveContractInfo;
  walletBalances: WalletBalances;
  referralStats: ReferralStats;
  referralLink: string;
}

const LiveDataDashboard = ({ 
  walletAddress, 
  contractInfo,
  walletBalances,
  referralStats, 
  referralLink 
}: LiveDataDashboardProps) => {
  const { toast } = useToast();

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  const openPolygonscan = () => {
    window.open(`https://polygonscan.com/address/${walletAddress}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header with Wallet Info */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Award className="h-8 w-8 text-gradient-gold" />
          <h3 className="text-3xl font-bold text-gradient-primary">
            Partner Dashboard
          </h3>
        </div>
        <p className="text-muted-foreground mb-4">
          Live data from Polygon blockchain - refreshes automatically
        </p>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="secondary">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={openPolygonscan}
            className="h-6 w-6 p-0"
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Project Progress */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Founding Partners Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-center mb-2">
            {contractInfo.totalSupply.toLocaleString()} / {FOUNDING_PARTNERS_TARGET.toLocaleString()}
          </div>
          <div className="w-full bg-secondary rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (contractInfo.totalSupply / FOUNDING_PARTNERS_TARGET) * 100)}%` }}
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            {contractInfo.remainingSupply.toLocaleString()} spots remaining
          </p>
        </CardContent>
      </Card>

      {/* Wallet Balances */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Fuel className="h-4 w-4 text-purple-500" />
              POL Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-purple-500">
              {walletBalances.pol.toFixed(4)}
            </div>
            <p className="text-xs text-muted-foreground">
              For gas fees
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Coins className="h-4 w-4 text-green-500" />
              USDC Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-500">
              ${walletBalances.usdc.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Available funds
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              Total Referrals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {referralStats.totalReferrals}
            </div>
            <p className="text-xs text-muted-foreground">
              From blockchain data
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              ${referralStats.totalEarnings.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              USDC received
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Referral Link */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Your Active Referral Link
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Share this link to earn $1 USDC for each new partner who joins
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input 
              value={referralLink} 
              readOnly 
              className="font-mono text-sm"
            />
            <Button 
              onClick={copyReferralLink}
              variant="outline"
              size="sm"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          {/* Recent Transactions */}
          {referralStats.recentTransactions.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2 text-sm">Recent Referral Earnings:</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {referralStats.recentTransactions.map((tx, index) => (
                  <div key={index} className="flex justify-between items-center text-xs bg-muted/50 p-2 rounded">
                    <span>${tx.amount.toFixed(2)}</span>
                    <span>{tx.timestamp.toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveDataDashboard;
