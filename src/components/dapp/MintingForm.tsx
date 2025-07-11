import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { approveUSDC, mintNFT } from "@/lib/web3";
import { validateReferrerAddress, normalizeEthereumAddress } from "@/lib/validation";
import { useDebounce } from "@/hooks/useDebounce";

interface MintingFormProps {
  connectedWallet: string;
  referrerAddress: string;
  setReferrerAddress: (address: string) => void;
  contractInfo: {
    mintPrice: number;
    remainingSupply: number;
    isPaused: boolean;
  };
  isProcessing: boolean;
  onMintStart: () => void;
  onMintSuccess: () => void;
  onMintError: (error: string) => void;
  toast: any;
}

const MintingForm = ({
  connectedWallet,
  referrerAddress,
  setReferrerAddress,
  contractInfo,
  isProcessing,
  onMintStart,
  onMintSuccess,
  onMintError,
  toast
}: MintingFormProps) => {
  const [validationError, setValidationError] = useState<string>("");
  const debouncedReferrerAddress = useDebounce(referrerAddress, 500);

  // Validate referrer address with debouncing
  useEffect(() => {
    if (debouncedReferrerAddress) {
      const validation = validateReferrerAddress(debouncedReferrerAddress);
      setValidationError(validation.error || "");
    } else {
      setValidationError("");
    }
  }, [debouncedReferrerAddress]);
  
  const handleMint = async () => {
    if (!connectedWallet) return;
    
    // Check if contract is paused
    if (contractInfo.isPaused) {
      toast({
        title: "Minting Paused",
        description: "Contract is currently paused. Please try again later.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if sold out
    if (contractInfo.remainingSupply <= 0) {
      toast({
        title: "Sold Out",
        description: "All founding deeds have been minted!",
        variant: "destructive",
      });
      return;
    }
    
    // Validate referrer address before proceeding
    if (referrerAddress && validationError) {
      toast({
        title: "Invalid Referrer Address",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    // Normalize and use zero address if no referrer provided
    const normalizedReferrer = referrerAddress 
      ? normalizeEthereumAddress(referrerAddress)
      : "0x0000000000000000000000000000000000000000";
    
    onMintStart();
    
    try {
      // Step 1: Approve USDC
      toast({
        title: "Step 1/2",
        description: "Approving USDC payment...",
      });
      
      await approveUSDC(connectedWallet);
      
      // Step 2: Mint NFT
      toast({
        title: "Step 2/2",
        description: "Minting your founding deed...",
      });
      
      await mintNFT(normalizedReferrer);
      
      onMintSuccess();
      
      toast({
        title: "Success!",
        description: "Your founding deed has been minted successfully!",
      });
      
    } catch (error: any) {
      console.error('Minting failed:', error);
      
      // Enhanced error handling
      let errorMessage = "Transaction failed. Please try again.";
      
      if (error.message?.includes("paused")) {
        errorMessage = "Contract is currently paused.";
      } else if (error.message?.includes("insufficient")) {
        errorMessage = "Insufficient USDC balance.";
      } else if (error.message?.includes("allowance")) {
        errorMessage = "USDC allowance not sufficient.";
      } else if (error.message?.includes("already minted")) {
        errorMessage = "You have already minted your founding deed.";
      } else if (error.message?.includes("sold out")) {
        errorMessage = "All founding deeds have been sold out.";
      }
      
      onMintError(errorMessage);
      
      toast({
        title: "Minting Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gradient-primary mb-2">
          Claim Your Founding Deed
        </h3>
        <p className="text-muted-foreground">
          Connected: {connectedWallet.slice(0, 6)}...{connectedWallet.slice(-4)}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="referrer" className="text-sm font-medium">
            Referrer Address (Optional)
          </Label>
          <div className="relative">
            <Input
              id="referrer"
              value={referrerAddress}
              onChange={(e) => setReferrerAddress(e.target.value)}
              placeholder="0x... (Leave empty if none)"
              className={`mt-2 ${validationError ? 'border-destructive' : ''}`}
            />
            {validationError && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-1">
                <AlertCircle className="h-4 w-4 text-destructive" />
              </div>
            )}
          </div>
          {validationError && (
            <p className="text-sm text-destructive mt-1">{validationError}</p>
          )}
        </div>

        <div className="bg-card/50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Investment Amount:</span>
            <span className="font-bold text-primary">
              {(contractInfo.mintPrice / 1000000).toFixed(1)} USDC
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Remaining Supply:</span>
            <span className="font-bold text-gradient-gold">
              {contractInfo.remainingSupply.toLocaleString()}
            </span>
          </div>
        </div>

        <Button 
          onClick={handleMint}
          disabled={isProcessing || contractInfo.isPaused || contractInfo.remainingSupply <= 0 || !!validationError}
          className="btn-glow-gold w-full text-lg py-6"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : contractInfo.isPaused ? (
            "Minting Paused"
          ) : contractInfo.remainingSupply <= 0 ? (
            "Sold Out"
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Confirm Contribution & Claim Deed ({(contractInfo.mintPrice / 1000000).toFixed(1)} USDC)
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MintingForm;