
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Award } from "lucide-react";
import { useEnhancedWeb3 } from "@/hooks/useEnhancedWeb3";

interface EnhancedDashboardStatsProps {
  walletAddress: string;
}

const EnhancedDashboardStats = ({ walletAddress }: EnhancedDashboardStatsProps) => {
  const { userData, referralStats, isLoadingUser } = useEnhancedWeb3();

  const getPartnerStatus = (referralCount: number): string => {
    if (referralCount >= 50) return "Gold Partner";
    if (referralCount >= 20) return "Silver Partner";
    if (referralCount >= 5) return "Bronze Partner";
    return "New Partner";
  };

  const statCards = [
    {
      title: "Total Earnings",
      value: isLoadingUser ? "..." : `$${referralStats.totalEarnings.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "from-green-500/10 to-emerald-500/10",
      borderColor: "border-green-500/20",
      subtitle: isLoadingUser ? "" : `${referralStats.pendingPayouts} pending`
    },
    {
      title: "Total Referrals",
      value: isLoadingUser ? "..." : referralStats.totalReferrals.toString(),
      icon: Users,
      color: "text-blue-500",
      bgColor: "from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/20",
      subtitle: isLoadingUser ? "" : `${referralStats.activeReferrals} active`
    },
    {
      title: "NFTs Owned",
      value: isLoadingUser ? "..." : userData.nftBalance.toString(),
      icon: Award,
      color: "text-purple-500",
      bgColor: "from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-500/20",
      subtitle: isLoadingUser ? "" : `${userData.mintCount} minted`
    },
    {
      title: "Partner Status",
      value: isLoadingUser ? "..." : getPartnerStatus(referralStats.totalReferrals),
      icon: TrendingUp,
      color: "text-yellow-500",
      bgColor: "from-yellow-500/10 to-orange-500/10",
      borderColor: "border-yellow-500/20",
      subtitle: isLoadingUser ? "" : "Based on referrals"
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
              {stat.subtitle && (
                <p className="text-xs text-muted-foreground">
                  {stat.subtitle}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default EnhancedDashboardStats;
