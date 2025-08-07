
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Share2, QrCode, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateReferralLink } from "@/lib/web3";

interface ReferralLinkProps {
  walletAddress: string;
}

const ReferralLink = ({ walletAddress }: ReferralLinkProps) => {
  const { toast } = useToast();
  const [referralLink] = useState(() => generateReferralLink(walletAddress));

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join ReferPay.org",
          text: "Join me on ReferPay.org - the future of decentralized referral marketing!",
          url: referralLink,
        });
      } catch (error) {
        copyToClipboard(); // Fallback to copy
      }
    } else {
      copyToClipboard(); // Fallback for unsupported browsers
    }
  };

  const openLink = () => {
    window.open(referralLink, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Your Referral Link
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Share this link to earn $1 for each new partner who joins
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input 
            value={referralLink} 
            readOnly 
            className="font-mono text-sm"
          />
          <Button 
            onClick={copyToClipboard}
            variant="outline"
            size="sm"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button 
            onClick={shareLink}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button 
            onClick={openLink}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Visit
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            disabled
          >
            <QrCode className="h-4 w-4" />
            QR Code
          </Button>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border">
          <h4 className="font-semibold mb-2">How it works:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Share your unique referral link</li>
            <li>• New users purchase NFTs through your link</li>
            <li>• You earn $1 instantly for each referral</li>
            <li>• Track your progress in real-time</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralLink;
