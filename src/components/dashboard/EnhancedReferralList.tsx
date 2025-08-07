
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Search, ExternalLink, DollarSign, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { getReferralsByUser, ReferralData } from "@/lib/referral/tracking";

interface EnhancedReferralListProps {
  walletAddress: string;
}

const EnhancedReferralList = ({ walletAddress }: EnhancedReferralListProps) => {
  const [referrals, setReferrals] = useState<ReferralData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReferrals = () => {
      setIsLoading(true);
      try {
        const userReferrals = getReferralsByUser(walletAddress);
        setReferrals(userReferrals);
      } catch (error) {
        console.error("Error loading referrals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (walletAddress) {
      // Add a small delay to simulate loading for better UX
      setTimeout(loadReferrals, 500);
    }
  }, [walletAddress]);

  const filteredReferrals = referrals.filter(referral =>
    referral.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
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
          <CardTitle>Your Referrals</CardTitle>
          <Badge variant="secondary">
            {referrals.length} Total
          </Badge>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by wallet address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
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
              {searchTerm ? "No referrals match your search" : "No referrals yet"}
            </p>
            {!searchTerm && (
              <p className="text-sm text-muted-foreground mt-2">
                Share your referral link to start earning!
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredReferrals.map((referral) => (
              <div key={referral.id} className="flex items-center space-x-4 p-3 bg-card/50 rounded-lg hover:bg-card/70 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">
                    {referral.walletAddress.slice(2, 4).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-sm font-mono truncate">
                      {referral.walletAddress.slice(0, 10)}...{referral.walletAddress.slice(-6)}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openPolygonscan(referral.walletAddress)}
                      className="h-6 w-6 p-0"
                      title="View on Polygonscan"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(referral.joinDate).toLocaleDateString()}
                    {referral.mintTransactionHash && (
                      <>
                        <span>•</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openTransaction(referral.mintTransactionHash)}
                          className="h-4 p-0 text-xs hover:underline"
                        >
                          View TX
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="font-bold text-green-500">
                      {referral.earned.toFixed(2)}
                    </span>
                  </div>
                  <Badge 
                    variant={referral.status === "confirmed" ? "default" : 
                            referral.status === "paid" ? "secondary" : "outline"}
                  >
                    {referral.status}
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
