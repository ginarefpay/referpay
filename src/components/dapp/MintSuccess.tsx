
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Copy, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface MintSuccessProps {
  referralLink: string;
  userNFTBalance: number;
  onCopyReferralLink: () => void;
}

const MintSuccess = ({ referralLink, userNFTBalance, onCopyReferralLink }: MintSuccessProps) => {
  return (
    <div className="space-y-6 text-center">
      <div>
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gradient-gold mb-2">
          Welcome, Partner!
        </h3>
        <p className="text-muted-foreground">
          Your founding deed has been successfully minted!
        </p>
        
        {userNFTBalance > 0 && (
          <div className="bg-card/50 p-3 rounded-lg mt-4">
            <div className="text-sm text-muted-foreground">Your NFTs:</div>
            <div className="text-lg font-bold text-gradient-gold">
              {userNFTBalance} Founding Deed{userNFTBalance !== 1 ? 's' : ''}
            </div>
          </div>
        )}
      </div>

      <div className="bg-card/50 p-4 rounded-lg">
        <Label className="text-sm font-medium text-muted-foreground">
          Your Referral Link:
        </Label>
        <div className="flex mt-2 space-x-2">
          <Input 
            value={referralLink} 
            readOnly 
            className="text-sm"
          />
          <Button 
            onClick={onCopyReferralLink}
            variant="outline"
            size="sm"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Share this link to earn $1 for each new partner you refer!
        </p>
      </div>

      <div className="space-y-3">
        <Link to="/dashboard">
          <Button className="btn-glow-primary w-full">
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Dashboard
          </Button>
        </Link>
        <p className="text-xs text-muted-foreground">
          Track your referrals, earnings, and achievements in your personal dashboard
        </p>
      </div>
    </div>
  );
};

export default MintSuccess;
