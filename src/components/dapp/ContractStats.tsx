
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Clock } from "lucide-react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { LiveContractInfo, FOUNDING_PARTNERS_TARGET } from "@/lib/web3/live-contract-data";

interface ContractStatsProps {
  contractInfo: LiveContractInfo;
  isLoading: boolean;
}

const ContractStats = ({ contractInfo, isLoading }: ContractStatsProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" text="Loading live contract data..." />
      </div>
    );
  }

  const progressPercentage = (contractInfo.totalSupply / FOUNDING_PARTNERS_TARGET) * 100;

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 max-w-2xl mx-auto mb-8">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-xl">
          <TrendingUp className="h-6 w-6 text-primary" />
          Live Partnership Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Progress Display */}
        <div className="text-center">
          <div className="text-4xl font-bold text-gradient-primary mb-2">
            {contractInfo.totalSupply.toLocaleString()}
            <span className="text-2xl text-muted-foreground">
              /{FOUNDING_PARTNERS_TARGET.toLocaleString()}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-4 mb-4">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(100, progressPercentage)}%` }}
            />
          </div>
          
          <p className="text-muted-foreground">
            Founding Partners Joined
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">Remaining</span>
            </div>
            <div className="text-2xl font-bold text-blue-500">
              {contractInfo.remainingSupply.toLocaleString()}
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Status</span>
            </div>
            <Badge 
              variant={contractInfo.isPaused ? "destructive" : "default"}
              className="text-sm"
            >
              {contractInfo.isPaused ? "Paused" : "Active"}
            </Badge>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground border-t pt-4">
          Live data from Polygon blockchain • Updates automatically every 30 seconds
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractStats;
