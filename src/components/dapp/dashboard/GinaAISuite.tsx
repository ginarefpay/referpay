
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Sparkles, 
  TrendingUp, 
  MessageSquare, 
  Lightbulb, 
  BarChart3,
  Send,
  Zap,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GinaAISuiteProps {
  walletAddress: string;
}

const GinaAISuite = ({ walletAddress }: GinaAISuiteProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("chat");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    {
      role: 'assistant',
      content: "Hi! I'm Gina, your AI assistant for ReferPay success. I can help you optimize your referral strategies, analyze your performance, and suggest campaign ideas. What would you like to explore today?"
    }
  ]);

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;

    const userMessage = chatMessage;
    setChatMessage("");
    
    // Add user message
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);

    // Simulate AI response (will be replaced with actual AI integration)
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage);
      setChatHistory(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    }, 1000);
  };

  const generateAIResponse = (message: string) => {
    // Mock AI responses - will be replaced with actual AI integration
    const responses = [
      "Based on your referral data, I suggest focusing on social media platforms where you have the most engagement. Would you like me to analyze your top-performing channels?",
      "I can see you've had great success with your current approach! Consider creating educational content about Web3 to attract more qualified referrals.",
      "Your referral conversion rate is above average. I recommend expanding to video content platforms like YouTube or TikTok for even better results.",
      "Let me suggest some campaign strategies that have worked well for other top-performing partners in your region."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const quickActions = [
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Analyze Performance",
      description: "Get insights on your referral metrics",
      action: "analyze-performance"
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Campaign Ideas",
      description: "Generate new promotional strategies",
      action: "generate-ideas"
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Optimize Targeting",
      description: "Improve your audience reach",
      action: "optimize-targeting"
    }
  ];

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      'analyze-performance': "Please analyze my referral performance and suggest improvements.",
      'generate-ideas': "Can you suggest some creative campaign ideas for promoting ReferPay?",
      'optimize-targeting': "How can I better target potential partners for my referral campaigns?"
    };
    
    setChatMessage(actionMessages[action as keyof typeof actionMessages] || "");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Bot className="h-8 w-8 text-primary animate-pulse" />
          <h2 className="text-3xl font-bold text-gradient-primary">
            Gina AI Suite
          </h2>
        </div>
        <p className="text-muted-foreground mb-4">
          AI-powered tools to maximize your partnership success
        </p>
        <Badge variant="secondary" className="text-sm">
          Powered by Gemini & ChatGPT • Advanced Analytics Coming Soon
        </Badge>
      </div>

      {/* AI Suite Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            AI Chat
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Performance Insights
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Campaign Generator
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card className="min-h-[500px] flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="h-5 w-5 text-primary" />
                Gina AI Assistant
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Ask me anything about optimizing your ReferPay partnership
              </p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Chat History */}
              <div className="flex-1 space-y-4 mb-4 max-h-80 overflow-y-auto">
                {chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action.action)}
                    className="text-xs p-2 h-auto flex flex-col gap-1"
                  >
                    {action.icon}
                    <span className="font-medium">{action.title}</span>
                  </Button>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask Gina about referral strategies, performance analysis, or campaign ideas..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="text-sm"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim()}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                AI-Powered Performance Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-12">
                <Zap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Advanced Analytics Coming Soon</h3>
                <p className="text-muted-foreground mb-6">
                  Gina will analyze your referral patterns, optimal posting times, 
                  audience demographics, and provide personalized optimization suggestions.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-600 mb-2">Performance Tracking</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 text-left">
                      <li>• Conversion rate analysis</li>
                      <li>• Optimal posting times</li>
                      <li>• Audience engagement patterns</li>
                      <li>• Competitive benchmarking</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-600 mb-2">Predictive Insights</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 text-left">
                      <li>• Revenue forecasting</li>
                      <li>• Growth trend analysis</li>
                      <li>• Market opportunity detection</li>
                      <li>• Risk assessment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                AI Campaign Generator
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Let Gina create personalized campaign strategies for you
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-12">
                <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Smart Campaign Creation</h3>
                <p className="text-muted-foreground mb-6">
                  Gina will generate custom marketing campaigns based on your performance data,
                  target audience, and current market trends.
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-600 mb-2">Campaign Types</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div>• Social Media Campaigns</div>
                      <div>• Content Marketing Strategies</div>
                      <div>• Email Outreach Templates</div>
                      <div>• Video Content Scripts</div>
                      <div>• Community Engagement Plans</div>
                      <div>• Influencer Collaboration Ideas</div>
                    </div>
                  </div>

                  <Button className="btn-glow-primary" disabled>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Campaign Strategy (Coming Soon)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GinaAISuite;
