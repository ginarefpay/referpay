interface ContractStatsProps {
  contractInfo: {
    totalSupply: number;
    remainingSupply: number;
    mintPrice: number;
    isPaused: boolean;
  };
  isLoading: boolean;
}

// REMOVED: The entire "getLiveStats" function is no longer needed.

const ContractStats = ({ contractInfo, isLoading }: ContractStatsProps) => {
  // CHANGED: The logic now directly uses the real contractInfo.
  const displayStats = contractInfo;

  return (
    <>
      {/* Real-time NFT Sales Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-2xl mx-auto">
        <div className="bg-card/50 p-4 rounded-lg border hover-lift">
          <div className="text-2xl font-bold text-primary">
            {isLoading ? "..." : displayStats.totalSupply.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">NFTs Sold</div>
        </div>
        <div className="bg-card/50 p-4 rounded-lg border hover-lift">
          <div className="text-2xl font-bold text-gradient-gold">
            {isLoading ? "..." : displayStats.remainingSupply.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Remaining</div>
        </div>
        <div className="bg-card/50 p-4 rounded-lg border hover-lift">
          <div className="text-2xl font-bold text-green-500">
            {isLoading
              ? "..."
              : `${(displayStats.mintPrice / 1000000).toFixed(1)} USDC`}
          </div>
          <div className="text-sm text-muted-foreground">Mint Price</div>
        </div>
      </div>

      {/* Live indicator */}
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        Live NFT sales data
      </div>

      {contractInfo.isPaused && (
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
          ⚠️ Minting is currently paused
        </div>
      )}
    </>
  );
};

export default ContractStats;
