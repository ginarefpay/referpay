
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Search, ExternalLink, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";

interface ReferralListProps {
  walletAddress: string;
}

interface Referral {
  id: string;
  walletAddress: string;
  joinDate: string;
  earned: number;
  status: "active" | "pending";
}

const ReferralList = ({ walletAddress }: ReferralListProps) => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReferrals = async () => {
      setIsLoading(true);
      try {
        // Mock data for demonstration - replace with actual API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setReferrals([
          {
            id: "1",
            walletAddress: "0x742d35Cc6635C0532925a3b8D6Ac0C0db5C4532e",
            joinDate: "2024-12-15",
            earned: 1.00,
            status: "active"
          },
          {
            id: "2", 
            walletAddress: "0x8ba1f109551bD432803012645Hac136c843D7e7A",
            joinDate: "2024-12-10",
            earned: 1.00,
            status: "active"
          },
          {
            id: "3",
            walletAddress: "0x9f2f4865A0D5f0fC8b6b8b8b8b8b8b8b8b8b8b8b",
            joinDate: "2024-12-08",
            earned: 1.00,
            status: "active"
          },
          {
            id: "4",
            walletAddress: "0xa1b2c3d4e5f6789012345678901234567890abcd",
            joinDate: "2024-12-05",
            earned: 0.00,
            status: "pending"
          }
        ]);
      } catch (error) {
        console.error("Error fetching referrals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (walletAddress) {
      fetchReferrals();
    }
  }, [walletAddress]);

  const filteredReferrals = referrals.filter(referral =>
    referral.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEtherscan = (address: string) => {
    window.open(`https://polygonscan.com/address/${address}`, '_blank');
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
                      onClick={() => openEtherscan(referral.walletAddress)}
                      className="h-6 w-6 p-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(referral.joinDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="font-bold text-green-500">
                      {referral.earned.toFixed(2)}
                    </span>
                  </div>
                  <Badge variant={referral.status === "active" ? "default" : "secondary"}>
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

export default ReferralList;
