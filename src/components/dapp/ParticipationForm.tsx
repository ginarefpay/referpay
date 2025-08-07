
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Loader2, AlertCircle, Users } from "lucide-react";
import { validateReferrerAddress, normalizeEthereumAddress } from "@/lib/validation";
import { useDebounce } from "@/hooks/useDebounce";

interface ParticipationFormProps {
  connectedWallet: string;
  referrerAddress: string;
  setReferrerAddress: (address: string) => void;
  contractInfo: {
    mintPrice: number;
    remainingSupply: number;
    isPaused: boolean;
  };
  isProcessing: boolean;
  onParticipate: () => void;
}

const ParticipationForm = ({
  connectedWallet,
  referrerAddress,
  setReferrerAddress,
  contractInfo,
  isProcessing,
  onParticipate
}: ParticipationFormProps) => {
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

  const canParticipate = !contractInfo.isPaused && 
                        contractInfo.remainingSupply > 0 && 
                        !validationError && 
                        !isProcessing;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Users className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-gradient-primary mb-2">
          Join ReferPay Partners
        </h3>
        <p className="text-muted-foreground mb-4">
          Become one of the 100,000 founding partners and start earning immediately
        </p>
        <div className="text-sm text-muted-foreground">
          Connected: {connectedWallet.slice(0, 6)}...{connectedWallet.slice(-4)}
        </div>
      </div>

      {/* Participation Details */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="text-lg">Partnership Investment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Investment Amount:</span>
            <span className="font-bold text-primary text-lg">
              {(contractInfo.mintPrice / 1000000).toFixed(1)} USDC
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Remaining Spots:</span>
            <span className="font-bold text-gradient-gold">
              {contractInfo.remainingSupply.toLocaleString()}
            </span>
          </div>
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              Your investment reserves your founding partnership position and activates your referral earning system.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Referrer Input */}
      <div className="space-y-2">
        <Label htmlFor="referrer" className="text-sm font-medium">
          Referrer Address (Optional)
        </Label>
        <div className="relative">
          <Input
            id="referrer"
            value={referrerAddress}
            onChange={(e) => setReferrerAddress(e.target.value)}
            placeholder="0x... (Leave empty if none)"
            className={`${validationError ? 'border-destructive' : ''}`}
          />
          {validationError && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <AlertCircle className="h-4 w-4 text-destructive" />
            </div>
          )}
        </div>
        {validationError && (
          <p className="text-sm text-destructive">{validationError}</p>
        )}
        {referrerAddress && !validationError && (
          <p className="text-sm text-green-600">✓ Valid referrer address</p>
        )}
      </div>

      {/* Benefits Preview */}
      <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
        <CardHeader>
          <CardTitle className="text-lg text-green-600">What You'll Get</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Founding Partner NFT & Recognition
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Active Referral Link ($1 per referral)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Real-time Earnings Dashboard
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Exclusive Partner Benefits
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Action Button */}
      <Button 
        onClick={onParticipate}
        disabled={!canParticipate}
        className="btn-glow-gold w-full text-lg py-6"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : contractInfo.isPaused ? (
          "Participation Paused"
        ) : contractInfo.remainingSupply <= 0 ? (
          "All Spots Taken"
        ) : (
          <>
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Contribute {(contractInfo.mintPrice / 1000000).toFixed(1)} USDC & Join Now
          </>
        )}
      </Button>

      {contractInfo.isPaused && (
        <p className="text-center text-sm text-muted-foreground">
          Participation is temporarily paused. Please check back later.
        </p>
      )}
    </div>
  );
};

export default ParticipationForm;
