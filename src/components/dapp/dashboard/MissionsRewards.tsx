
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  Youtube, 
  Twitter, 
  Play, 
  DollarSign, 
  Clock, 
  CheckCircle2,
  ExternalLink,
  Gift,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Mission {
  id: string;
  type: 'youtube' | 'twitter' | 'tiktok';
  title: string;
  description: string;
  reward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  timeEstimate: string;
  requirements: string[];
  status: 'available' | 'pending' | 'completed';
}

interface MissionsRewardsProps {
  walletAddress: string;
}

const MissionsRewards = ({ walletAddress }: MissionsRewardsProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("available");
  const [submissionUrl, setSubmissionUrl] = useState("");

  // Mock missions data - will be replaced with Supabase
  const missions: Mission[] = [
    {
      id: "1",
      type: "youtube",
      title: "Create ReferPay Review Video",
      description: "Create a 2-3 minute video explaining ReferPay and its benefits",
      reward: 0.10,
      difficulty: "medium",
      timeEstimate: "30-60 min",
      requirements: [
        "Video must be 2-3 minutes long",
        "Explain ReferPay concept clearly",
        "Include your referral link in description",
        "Minimum 720p quality"
      ],
      status: "available"
    },
    {
      id: "2",
      type: "twitter",
      title: "Twitter Thread about Web3 Referrals",
      description: "Create an educational thread about referral systems in Web3",
      reward: 0.10,
      difficulty: "easy",
      timeEstimate: "15-30 min",
      requirements: [
        "Minimum 5 tweets in thread",
        "Tag @ReferPayOrg",
        "Include relevant hashtags",
        "Mention ReferPay partnership"
      ],
      status: "available"
    },
    {
      id: "3",
      type: "tiktok",
      title: "ReferPay TikTok Explainer",
      description: "Create an engaging TikTok explaining blockchain partnerships",
      reward: 0.10,
      difficulty: "medium",
      timeEstimate: "45-90 min",
      requirements: [
        "15-60 second video",
        "Creative and engaging format",
        "Explain Web3 concepts simply",
        "Use trending audio/effects"
      ],
      status: "pending"
    }
  ];

  const availableMissions = missions.filter(m => m.status === 'available');
  const pendingMissions = missions.filter(m => m.status === 'pending');
  const completedMissions = missions.filter(m => m.status === 'completed');

  const getIcon = (type: string) => {
    switch (type) {
      case 'youtube': return <Youtube className="h-5 w-5 text-red-500" />;
      case 'twitter': return <Twitter className="h-5 w-5 text-blue-500" />;
      case 'tiktok': return <Play className="h-5 w-5 text-pink-500" />;
      default: return <Target className="h-5 w-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'hard': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const handleSubmitMission = (missionId: string) => {
    if (!submissionUrl.trim()) {
      toast({
        title: "URL Required",
        description: "Please provide the URL of your completed work",
        variant: "destructive"
      });
      return;
    }

    // Here we would submit to Supabase for admin review
    toast({
      title: "Mission Submitted!",
      description: "Your submission has been sent for review. You'll receive USDC once approved.",
    });
    
    setSubmissionUrl("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Target className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-gradient-primary">
            Missions & Rewards
          </h2>
        </div>
        <p className="text-muted-foreground mb-4">
          Complete promotional missions and earn USDC rewards
        </p>
        <Badge variant="secondary" className="text-sm">
          Phase 1: Manual Review • Phase 2: Automated Campaigns Coming Soon
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              Available Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-500">
              ${availableMissions.reduce((sum, m) => sum + m.reward, 0).toFixed(2)} USDC
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-blue-500">
              {pendingMissions.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-500" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-purple-500">
              {completedMissions.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mission Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">Available ({availableMissions.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingMissions.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedMissions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          {availableMissions.map((mission) => (
            <Card key={mission.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getIcon(mission.type)}
                    <div>
                      <CardTitle className="text-lg">{mission.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{mission.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-500">
                      ${mission.reward.toFixed(2)} USDC
                    </div>
                    <Badge className={getDifficultyColor(mission.difficulty)}>
                      {mission.difficulty}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {mission.timeEstimate}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Requirements:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {mission.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 pt-2 border-t">
                  <Input
                    placeholder="Paste URL of your completed work"
                    value={submissionUrl}
                    onChange={(e) => setSubmissionUrl(e.target.value)}
                    className="text-sm"
                  />
                  <Button 
                    onClick={() => handleSubmitMission(mission.id)}
                    className="btn-glow-primary whitespace-nowrap"
                  >
                    Submit Work
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingMissions.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No Pending Missions</h3>
                <p className="text-muted-foreground">Complete some missions to see them here for review!</p>
              </CardContent>
            </Card>
          ) : (
            pendingMissions.map((mission) => (
              <Card key={mission.id} className="border-yellow-500/20 bg-yellow-500/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getIcon(mission.type)}
                      <div>
                        <CardTitle className="text-lg">{mission.title}</CardTitle>
                        <Badge variant="outline" className="text-yellow-600">
                          Under Review
                        </Badge>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-green-500">
                      ${mission.reward.toFixed(2)} USDC
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Your submission is being reviewed. You'll receive USDC once approved.
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedMissions.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No Completed Missions Yet</h3>
                <p className="text-muted-foreground">Complete and get approved for missions to see them here!</p>
              </CardContent>
            </Card>
          ) : (
            completedMissions.map((mission) => (
              <Card key={mission.id} className="border-green-500/20 bg-green-500/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getIcon(mission.type)}
                      <div>
                        <CardTitle className="text-lg">{mission.title}</CardTitle>
                        <Badge variant="outline" className="text-green-600">
                          Completed & Paid
                        </Badge>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-green-500">
                      +${mission.reward.toFixed(2)} USDC
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Phase 2 Preview */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Coming Soon: Phase 2 Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Project owners can create custom campaigns</li>
            <li>• Automated verification and reward distribution</li>
            <li>• Advanced analytics and performance tracking</li>
            <li>• Higher reward tiers for top performers</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default MissionsRewards;
