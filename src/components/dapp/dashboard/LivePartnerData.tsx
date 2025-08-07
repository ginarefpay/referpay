
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Share2, 
  Copy, 
  TrendingUp, 
  ExternalLink,
  Clock,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WalletBalances } from "@/lib/web3/wallet-balances";
import { ReferralStats } from "@/lib/web3/referral-analyzer";
import { LiveContractInfo, FOUNDING_PARTNERS_TARGET } from "@/lib/web3/live-contract-data";

interface LivePartnerDataProps {
  walletAddress: string;
  contractInfo: LiveContractInfo;
  walletBalances: WalletBalances;
  referralStats: ReferralStats;
  referralLink: string;
}

const LivePartnerData = ({
  walletAddress,
  contractInfo,
  walletBalances,
  referralStats,
  referralLink
}: LivePartnerDataProps) => {
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

  const progressPercentage = (contractInfo.totalSupply / FOUNDING_PARTNERS_TARGET) * 100;

  return (
    <div className="space-y-6">
      {/* Project Progress */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            Live Project Progress
          </CardTitle>
          <p className="text-muted-foreground">
            Real-time data from Polygon blockchain
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-gradient-primary mb-2">
              {contractInfo.totalSupply.toLocaleString()} / {FOUNDING_PARTNERS_TARGET.toLocaleString()}
            </div>
            <div className="w-full bg-secondary rounded-full h-4 mb-3">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, progressPercentage)}%` }}
              />
            </div>
            <p className="text-muted-foreground">
              {contractInfo.remainingSupply.toLocaleString()} founding partner positions remaining
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {progressPercentage.toFixed(1)}%
              </div>
              <p className="text-sm text-muted-foreground">Complete</p>
            </div>
            <div className="text-center">
              <Badge variant={contractInfo.isPaused ? "destructive" : "default"}>
                {contractInfo.isPaused ? "Paused" : "Active"}
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">Status</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral Performance */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Your Referral Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-500/10 rounded-lg">
                <div className="text-2xl font-bold text-green-500">
                  {referralStats.totalReferrals}
                </div>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
              </div>
              <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                <div className="text-2xl font-bold text-blue-500">
                  ${referralStats.totalEarnings.toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground">USDC Earned</p>
              </div>
            </div>

            {referralStats.recentTransactions.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 text-sm">Recent Earnings:</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {referralStats.recentTransactions.slice(0, 3).map((tx, index) => (
                    <div key={index} className="flex justify-between items-center text-xs bg-muted/50 p-2 rounded">
                      <span className="font-mono text-green-500">+${tx.amount.toFixed(2)}</span>
                      <span className="text-muted-foreground">{tx.timestamp.toLocaleDateString()}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0"
                        onClick={() => window.open(`https://polygonscan.com/tx/${tx.hash}`, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Active Referral Link
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Earn $1 USDC for each successful referral
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input 
                value={referralLink} 
                readOnly 
                className="font-mono text-xs"
              />
              <Button 
                onClick={copyReferralLink}
                variant="outline"
                size="sm"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border">
              <h4 className="font-semibold mb-2 text-sm">Partnership Benefits:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• $1 USDC per successful referral (instant payment)</li>
                <li>• Real-time blockchain tracking & verification</li>
                <li>• Founding member recognition & status</li>
                <li>• Access to exclusive partner tools & AI suite</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Data Footer */}
      <Card className="bg-muted/20">
        <CardContent className="py-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
            <div>Live data from Polygon network • Auto-refresh every 30s</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LivePartnerData;
