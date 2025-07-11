interface ContractStatsProps {
  contractInfo: {
    totalSupply: number;
    remainingSupply: number;
    mintPrice: number;
    isPaused: boolean;
  };
  isLoading: boolean;
}

const ContractStats = ({ contractInfo, isLoading }: ContractStatsProps) => {
  return (
    <>
      {/* Real-time Contract Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-2xl mx-auto">
        <div className="bg-card/50 p-4 rounded-lg border">
          <div className="text-2xl font-bold text-primary">
            {isLoading ? "..." : contractInfo.totalSupply.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Total Minted</div>
        </div>
        <div className="bg-card/50 p-4 rounded-lg border">
          <div className="text-2xl font-bold text-gradient-gold">
            {isLoading ? "..." : contractInfo.remainingSupply.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Remaining</div>
        </div>
        <div className="bg-card/50 p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-500">
            {isLoading ? "..." : (contractInfo.mintPrice / 1000000).toFixed(1)} USDC
          </div>
          <div className="text-sm text-muted-foreground">Mint Price</div>
        </div>
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