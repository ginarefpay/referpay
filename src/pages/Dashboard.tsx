
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, Users, DollarSign, Award, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useWeb3State } from "@/hooks/useWeb3State";
import DashboardStats from "@/components/dashboard/DashboardStats";
import ReferralList from "@/components/dashboard/ReferralList";
import EarningsChart from "@/components/dashboard/EarningsChart";
import NotificationCenter from "@/components/dashboard/NotificationCenter";
import ReferralLink from "@/components/dashboard/ReferralLink";

const Dashboard = () => {
  const navigate = useNavigate();
  const { connectedWallet, handleConnectWallet } = useWeb3State();
  const [activeTab, setActiveTab] = useState("overview");

  const handleNavigation = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Redirect to home if wallet not connected
  useEffect(() => {
    if (!connectedWallet) {
      // Don't redirect immediately, give user chance to connect
      const timer = setTimeout(() => {
        if (!connectedWallet) {
          navigate('/');
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [connectedWallet, navigate]);

  if (!connectedWallet) {
    return (
      <Layout onNavigate={handleNavigation}>
        <div className="min-h-screen bg-gradient-to-br from-background via-card/50 to-background py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gradient-primary mb-8">Connect Your Wallet</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Please connect your wallet to access your dashboard
              </p>
              <Button onClick={handleConnectWallet} className="btn-glow-primary">
                Connect Wallet
              </Button>
              <div className="mt-8">
                <Link to="/" className="text-muted-foreground hover:text-primary">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout onNavigate={handleNavigation}>
      <div className="min-h-screen bg-gradient-to-br from-background via-card/50 to-background py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              <h1 className="text-4xl font-bold text-gradient-primary">Partner Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Welcome back, {connectedWallet.slice(0, 6)}...{connectedWallet.slice(-4)}
              </p>
            </div>
            <NotificationCenter />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="referrals" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Referrals
              </TabsTrigger>
              <TabsTrigger value="earnings" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Earnings
              </TabsTrigger>
              <TabsTrigger value="rewards" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Rewards
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <DashboardStats walletAddress={connectedWallet} />
              <div className="grid lg:grid-cols-2 gap-8">
                <EarningsChart walletAddress={connectedWallet} />
                <ReferralLink walletAddress={connectedWallet} />
              </div>
            </TabsContent>

            <TabsContent value="referrals" className="space-y-8">
              <ReferralList walletAddress={connectedWallet} />
            </TabsContent>

            <TabsContent value="earnings" className="space-y-8">
              <div className="grid gap-8">
                <EarningsChart walletAddress={connectedWallet} detailed={true} />
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                        <span>Direct Referrals</span>
                        <span className="font-bold text-green-500">$23.00</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                        <span>Bonus Rewards</span>
                        <span className="font-bold text-blue-500">$5.00</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg border-t">
                        <span className="font-semibold">Total Earnings</span>
                        <span className="font-bold text-gradient-gold text-lg">$28.00</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="rewards" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Achievement Badges</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                      <Award className="h-8 w-8 text-yellow-500" />
                      <div>
                        <h4 className="font-semibold">First Partner</h4>
                        <p className="text-sm text-muted-foreground">Successfully referred your first partner</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
                      <Users className="h-8 w-8 text-blue-500" />
                      <div>
                        <h4 className="font-semibold">Network Builder</h4>
                        <p className="text-sm text-muted-foreground">Referred 5+ partners</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Next Milestone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="text-6xl font-bold text-gradient-primary">25</div>
                      <p className="text-muted-foreground">Partners until Gold Status</p>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-gradient-to-r from-primary to-primary/60 h-2 rounded-full w-[32%]"></div>
                      </div>
                      <p className="text-sm text-muted-foreground">8 of 33 partners referred</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
