
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Award } from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardStatsProps {
  walletAddress: string;
}

interface Stats {
  totalEarnings: number;
  totalReferrals: number;
  nftBalance: number;
  partnerStatus: string;
}

const DashboardStats = ({ walletAddress }: DashboardStatsProps) => {
  const [stats, setStats] = useState<Stats>({
    totalEarnings: 0,
    totalReferrals: 0,
    nftBalance: 0,
    partnerStatus: "Loading..."
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // Mock data for demonstration - replace with actual API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          totalEarnings: 28.5,
          totalReferrals: 23,
          nftBalance: 1,
          partnerStatus: "Bronze Partner"
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (walletAddress) {
      fetchStats();
    }
  }, [walletAddress]);

  const statCards = [
    {
      title: "Total Earnings",
      value: isLoading ? "..." : `$${stats.totalEarnings.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "from-green-500/10 to-emerald-500/10",
      borderColor: "border-green-500/20"
    },
    {
      title: "Total Referrals",
      value: isLoading ? "..." : stats.totalReferrals.toString(),
      icon: Users,
      color: "text-blue-500",
      bgColor: "from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      title: "NFTs Owned",
      value: isLoading ? "..." : stats.nftBalance.toString(),
      icon: Award,
      color: "text-purple-500",
      bgColor: "from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      title: "Partner Status",
      value: isLoading ? "..." : stats.partnerStatus,
      icon: TrendingUp,
      color: "text-yellow-500",
      bgColor: "from-yellow-500/10 to-orange-500/10",
      borderColor: "border-yellow-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className={`bg-gradient-to-br ${stat.bgColor} border ${stat.borderColor}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              {stat.title === "Total Earnings" && !isLoading && (
                <p className="text-xs text-muted-foreground">
                  +$5.50 from last month
                </p>
              )}
              {stat.title === "Total Referrals" && !isLoading && (
                <p className="text-xs text-muted-foreground">
                  +3 new this month
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
