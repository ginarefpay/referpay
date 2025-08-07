
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Award, Copy, DollarSign, Users, TrendingUp, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PartnerDashboardProps {
  walletAddress: string;
  userData: {
    nftBalance: number;
    mintCount: number;
    referralCount: number;
    totalEarnings: number;
  };
  referralStats: {
    totalReferrals: number;
    totalEarnings: number;
    pendingPayouts: number;
    activeReferrals: number;
  };
  referralLink: string;
}

const PartnerDashboard = ({ 
  walletAddress, 
  userData, 
  referralStats, 
  referralLink 
}: PartnerDashboardProps) => {
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

  const getPartnerStatus = (referralCount: number): string => {
    if (referralCount >= 50) return "Gold Partner";
    if (referralCount >= 20) return "Silver Partner";
    if (referralCount >= 5) return "Bronze Partner";
    return "New Partner";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Award className="h-8 w-8 text-gradient-gold" />
          <h3 className="text-3xl font-bold text-gradient-primary">
            Partner Dashboard
          </h3>
        </div>
        <p className="text-muted-foreground">
          Welcome back! Your partnership is active and earning.
        </p>
        <Badge variant="secondary" className="mt-2">
          {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              ${referralStats.totalEarnings.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {referralStats.pendingPayouts} pending
            </p>
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
            <p className="text-xs text-muted-foreground">
              {referralStats.activeReferrals} active
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Award className="h-4 w-4 text-purple-500" />
              NFTs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">
              {userData.nftBalance}
            </div>
            <p className="text-xs text-muted-foreground">
              {userData.mintCount} minted
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-yellow-500" />
              Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold text-yellow-500">
              {getPartnerStatus(referralStats.totalReferrals)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Link Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Your Active Referral Link
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Share this link to earn $1 for each new partner who joins
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

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border">
            <h4 className="font-semibold mb-2">Partnership Benefits:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Earn $1 instantly for each successful referral</li>
              <li>• Access to exclusive partner resources</li>
              <li>• Real-time earnings tracking</li>
              <li>• Founding member recognition</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerDashboard;
