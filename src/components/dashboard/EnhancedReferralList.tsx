
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Search, ExternalLink, DollarSign, Users, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { analyzeReferralEarnings, clearReferralCache, ReferralTransaction } from "@/lib/web3/referral-analyzer";

interface EnhancedReferralListProps {
  walletAddress: string;
}

const EnhancedReferralList = ({ walletAddress }: EnhancedReferralListProps) => {
  const [referrals, setReferrals] = useState<ReferralTransaction[]>([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadReferrals = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      console.log('Loading referrals for wallet:', walletAddress);
      const stats = await analyzeReferralEarnings(walletAddress);
      setReferrals(stats.recentTransactions);
      setTotalEarnings(stats.totalEarnings);
    } catch (error) {
      console.error("Error loading referrals:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    clearReferralCache(walletAddress);
    await loadReferrals(true);
  };

  useEffect(() => {
    if (walletAddress) {
      loadReferrals();
    }
  }, [walletAddress]);

  const filteredReferrals = referrals.filter(referral =>
    referral.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    referral.from.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openPolygonscan = (address: string) => {
    window.open(`https://polygonscan.com/address/${address}`, '_blank');
  };

  const openTransaction = (txHash: string) => {
    window.open(`https://polygonscan.com/tx/${txHash}`, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Your Referral Earnings</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {referrals.length} Payments
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by transaction hash or contract address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <DollarSign className="h-5 w-5 text-green-500" />
            <span className="text-lg font-bold text-green-500">
              ${totalEarnings.toFixed(2)} USDC
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-3 bg-card/50 rounded-lg animate-pulse">
                <div className="w-12 h-12 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
                <div className="w-16 h-6 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredReferrals.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {searchTerm ? "No referral payments match your search" : "No referral payments found"}
            </p>
            {!searchTerm && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  Referral payments appear here when someone uses your referral link to join.
                </p>
                <p className="text-xs text-muted-foreground">
                  Each referral earns you exactly $1 USDC paid directly to your wallet.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredReferrals.map((referral) => (
              <div key={referral.hash} className="flex items-center space-x-4 p-3 bg-card/50 rounded-lg hover:bg-card/70 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-sm font-mono truncate">
                      {referral.hash.slice(0, 16)}...{referral.hash.slice(-8)}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openTransaction(referral.hash)}
                      className="h-6 w-6 p-0"
                      title="View transaction on Polygonscan"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {referral.timestamp.toLocaleDateString()} at {referral.timestamp.toLocaleTimeString()}
                    <span>•</span>
                    <span className="text-xs">
                      From: {referral.from.slice(0, 6)}...{referral.from.slice(-4)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="font-bold text-green-500">
                      ${referral.amount.toFixed(2)}
                    </span>
                  </div>
                  <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20">
                    Referral Payment
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedReferralList;
