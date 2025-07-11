import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

interface WalletConnectProps {
  onConnect: () => Promise<void>;
}

const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Wallet className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gradient-primary mb-2">
          Connect Your Wallet
        </h3>
        <p className="text-muted-foreground">
          Connect your wallet to start the process
        </p>
      </div>
      
      <Button 
        onClick={onConnect}
        className="btn-glow-primary w-full text-lg py-6"
      >
        <Wallet className="mr-2 h-5 w-5" />
        Connect Wallet
      </Button>
    </div>
  );
};

export default WalletConnect;