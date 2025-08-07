
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";

interface EarningsChartProps {
  walletAddress: string;
  detailed?: boolean;
}

const EarningsChart = ({ walletAddress, detailed = false }: EarningsChartProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true);
      try {
        // Mock data for demonstration - replace with actual API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData = [
          { date: "Dec 1", earnings: 0, referrals: 0 },
          { date: "Dec 5", earnings: 2, referrals: 2 },
          { date: "Dec 8", earnings: 5, referrals: 5 },
          { date: "Dec 10", earnings: 8, referrals: 8 },
          { date: "Dec 12", earnings: 15, referrals: 15 },
          { date: "Dec 15", earnings: 23, referrals: 23 },
          { date: "Today", earnings: 28.5, referrals: 23 }
        ];
        
        setChartData(mockData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (walletAddress) {
      fetchChartData();
    }
  }, [walletAddress]);

  const chartConfig = {
    earnings: {
      label: "Earnings ($)",
      color: "hsl(var(--primary))",
    },
    referrals: {
      label: "Referrals",
      color: "hsl(var(--secondary))",
    },
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {detailed ? "Detailed Earnings Analytics" : "Earnings Overview"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading chart...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          {detailed ? "Detailed Earnings Analytics" : "Earnings Overview"}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {detailed ? "Comprehensive view of your earnings and referral growth" : "Your earnings growth over time"}
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {detailed ? (
              <BarChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="earnings" fill="var(--color-earnings)" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="var(--color-earnings)" 
                  strokeWidth={3}
                  dot={{ fill: "var(--color-earnings)", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default EarningsChart;
