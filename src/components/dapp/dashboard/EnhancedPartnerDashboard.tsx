
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Share2, 
  Copy, 
  TrendingUp, 
  ExternalLink,
  Clock,
  Activity,
  Image,
  Coins,
  Users,
  Calendar,
  DollarSign,
  Wallet
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WalletBalances } from "@/lib/web3/wallet-balances";
import { EnhancedReferralStats } from "@/lib/web3/enhanced-referral-analyzer";
import { PartnerVerification } from "@/lib/web3/partner-verification";
import { LiveContractInfo, FOUNDING_PARTNERS_TARGET } from "@/lib/web3/live-contract-data";

interface EnhancedPartnerDashboardProps {
  walletAddress: string;
  contractInfo: LiveContractInfo;
  walletBalances: WalletBalances;
  partnerVerification: PartnerVerification;
  referralStats: EnhancedReferralStats;
  referralLink: string;
}

const EnhancedPartnerDashboard = ({
  walletAddress,
  contractInfo,
  walletBalances,
  partnerVerification,
  referralStats,
  referralLink
}: EnhancedPartnerDashboardProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

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
      {/* Welcome Header with NFT */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Image className="h-10 w-10 text-white" />
                </div>
                <Badge className="absolute -bottom-2 -right-2 bg-green-500 text-white">
                  #{partnerVerification.deedTokenId || '---'}
                </Badge>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gradient-primary">
                  ReferPay Founding Deed
                </h2>
                <p className="text-muted-foreground">
                  Partnership since {partnerVerification.partnershipDate?.toLocaleDateString() || 'Genesis'}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">
                    <Coins className="h-3 w-3 mr-1" />
                    {partnerVerification.nftBalance} NFT{partnerVerification.nftBalance !== 1 ? 's' : ''}
                  </Badge>
                  <Badge variant="outline">
                    Founding Partner
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`https://polygonscan.com/address/${walletAddress}`, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Explorer
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  Total Referrals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-500">
                  {referralStats.totalReferrals}
                </div>
                <p className="text-xs text-muted-foreground">Verified on-chain</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  Total Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">
                  ${referralStats.totalEarnings.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">USDC earned</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-purple-500" />
                  USDC Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-500">
                  ${walletBalances.usdc.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">Current wallet</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                  Partnership Rank
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-500">
                  #{Math.min(partnerVerification.deedTokenId || 999, contractInfo.totalSupply)}
                </div>
                <p className="text-xs text-muted-foreground">Founding member</p>
              </CardContent>
            </Card>
          </div>

          {/* Project Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Live Project Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-primary mb-2">
                  {contractInfo.totalSupply.toLocaleString()} / {FOUNDING_PARTNERS_TARGET.toLocaleString()}
                </div>
                <div className="w-full bg-secondary rounded-full h-3 mb-3">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(100, progressPercentage)}%` }}
                  />
                </div>
                <p className="text-muted-foreground">
                  {contractInfo.remainingSupply.toLocaleString()} founding partner positions remaining
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Active Referral Link */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Your Active Referral Link
              </CardTitle>
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
                <h4 className="font-semibold mb-2">Partnership Benefits:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• $1 USDC per successful referral (instant blockchain payment)</li>
                  <li>• Real-time transaction tracking & verification</li>
                  <li>• Founding member recognition & exclusive status</li>
                  <li>• Access to professional partnership tools</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Verified Referral Earnings
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                All earnings are verified directly from the Polygon blockchain
              </p>
            </CardHeader>
            <CardContent>
              {referralStats.earningsHistory.length > 0 ? (
                <div className="space-y-3">
                  {referralStats.earningsHistory.slice(0, 10).map((earning, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <div className="font-medium text-green-500">+${earning.amount.toFixed(2)} USDC</div>
                          <div className="text-xs text-muted-foreground">
                            {earning.timestamp.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`https://polygonscan.com/tx/${earning.transactionHash}`, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No Referrals Yet</h3>
                  <p className="text-muted-foreground">
                    Share your referral link to start earning $1 USDC per referral!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Current Wallet Balances
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">POL (Native)</div>
                    <div className="text-sm text-muted-foreground">Polygon gas token</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{walletBalances.pol.toFixed(4)}</div>
                    <div className="text-sm text-muted-foreground">POL</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">USDC</div>
                    <div className="text-sm text-muted-foreground">USD Coin</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-500">${walletBalances.usdc.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">USDC</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  NFT Assets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Image className="h-12 w-12 text-white" />
                  </div>
                  <h4 className="font-semibold">ReferPay Founding Deed</h4>
                  <p className="text-sm text-muted-foreground">Token #{partnerVerification.deedTokenId || '---'}</p>
                  <Badge variant="secondary" className="mt-2">
                    Founding Partner Status
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Partnership Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Partnership Date:</span>
                  <span>{partnerVerification.partnershipDate?.toLocaleDateString() || 'Genesis Partner'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Days Active:</span>
                  <span>
                    {partnerVerification.partnershipDate 
                      ? Math.floor((Date.now() - partnerVerification.partnershipDate.getTime()) / (1000 * 60 * 60 * 24))
                      : 'Genesis'
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Average Earnings per Day:</span>
                  <span>
                    ${partnerVerification.partnershipDate 
                      ? (referralStats.totalEarnings / Math.max(1, Math.floor((Date.now() - partnerVerification.partnershipDate.getTime()) / (1000 * 60 * 60 * 24)))).toFixed(2)
                      : '0.00'
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Last Referral:</span>
                  <span>
                    {referralStats.earningsHistory.length > 0 
                      ? referralStats.earningsHistory[0].timestamp.toLocaleDateString()
                      : 'No referrals yet'
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Data Last Updated:</span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {referralStats.lastUpdated.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedPartnerDashboard;
