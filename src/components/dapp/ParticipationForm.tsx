
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  DollarSign, 
  Users, 
  CheckCircle, 
  AlertCircle,
  Coins,
  Zap
} from "lucide-react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { LiveContractInfo } from "@/lib/web3/live-contract-data";

interface ParticipationFormProps {
  connectedWallet: string;
  referrerAddress: string;
  setReferrerAddress: (address: string) => void;
  contractInfo: LiveContractInfo;
  isProcessing: boolean;
  onParticipate: () => Promise<void>;
}

const ParticipationForm = ({
  connectedWallet,
  referrerAddress,
  setReferrerAddress,
  contractInfo,
  isProcessing,
  onParticipate
}: ParticipationFormProps) => {
  const [isValidReferrer, setIsValidReferrer] = useState(true);

  const handleReferrerChange = (value: string) => {
    setReferrerAddress(value);
    // Basic validation for Ethereum address
    const isValid = value === '' || /^0x[a-fA-F0-9]{40}$/.test(value);
    setIsValidReferrer(isValid);
  };

  const mintPriceUSD = (contractInfo.mintPrice / 1000000).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gradient-primary mb-2">
          Join ReferPay Partnership
        </h2>
        <p className="text-muted-foreground">
          Become a founding partner and start earning from referrals
        </p>
      </div>

      {/* Wallet Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Connected Wallet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <code className="text-sm font-mono">{connectedWallet}</code>
            <Badge variant="secondary">Connected</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Referrer Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5" />
            Referrer Address (Optional)
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            If you were referred by someone, enter their wallet address
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="referrer">Referrer Wallet Address</Label>
            <Input
              id="referrer"
              placeholder="0x... (optional)"
              value={referrerAddress}
              onChange={(e) => handleReferrerChange(e.target.value)}
              className={!isValidReferrer ? "border-destructive" : ""}
            />
            {!isValidReferrer && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                Please enter a valid Ethereum address
              </div>
            )}
          </div>
          
          {referrerAddress && isValidReferrer && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Referrer Set</span>
              </div>
              <p className="text-xs text-green-600/80 mt-1">
                Your referrer will receive $1 USDC when you join
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Partnership Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5" />
            Partnership Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <Coins className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">${mintPriceUSD}</div>
              <p className="text-xs text-muted-foreground">Membership Fee (USDC)</p>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <Zap className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-500">$1.00</div>
              <p className="text-xs text-muted-foreground">Per Referral Reward</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-semibold">Partnership Benefits:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Earn $1 USDC for each successful referral
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Real-time blockchain tracking & payments
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Access to Gina AI suite for optimization
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Founding member recognition & status
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Professional partnership dashboard
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Join Button */}
      <Card>
        <CardContent className="pt-6">
          <Button
            onClick={onParticipate}
            disabled={isProcessing || !isValidReferrer || contractInfo.isPaused}
            className="w-full btn-glow-primary text-lg py-6"
            size="lg"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                Processing Partnership...
              </div>
            ) : contractInfo.isPaused ? (
              'Partnership Currently Paused'
            ) : (
              `Join ReferPay Partnership - $${mintPriceUSD} USDC`
            )}
          </Button>
          
          <p className="text-center text-xs text-muted-foreground mt-3">
            By joining, you agree to ReferPay's partnership terms and conditions
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParticipationForm;
