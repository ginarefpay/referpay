import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Wallet, Copy, CheckCircle2, Loader2 } from "lucide-react";
import {
  connectWallet,
  approveUSDT,
  mintNFT,
  checkMintStatus,
  generateReferralLink,
  getReferrerFromURL,
  MINT_PRICE
} from "@/lib/web3";

const DAppSection = () => {
  const [connectedWallet, setConnectedWallet] = useState<string>("");
  const [referrerAddress, setReferrerAddress] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasMinted, setHasMinted] = useState(false);
  const [referralLink, setReferralLink] = useState<string>("");
  const [step, setStep] = useState<'connect' | 'mint' | 'success'>('connect');
  const { toast } = useToast();

  useEffect(() => {
    // Check if there's a referrer in the URL
    const urlReferrer = getReferrerFromURL();
    if (urlReferrer) {
      setReferrerAddress(urlReferrer);
    }
  }, []);

  useEffect(() => {
    // Check if user already minted
    if (connectedWallet) {
      checkMintStatus(connectedWallet).then(mintCount => {
        if (mintCount > 0) {
          setHasMinted(true);
          setStep('success');
          setReferralLink(generateReferralLink(connectedWallet));
        } else {
          setStep('mint');
        }
      }).catch(console.error);
    }
  }, [connectedWallet]);

  const handleConnectWallet = async () => {
    try {
      const address = await connectWallet();
      if (address) {
        setConnectedWallet(address);
        toast({
          title: "Wallet Connected",
          description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
        });
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMint = async () => {
    if (!connectedWallet) return;
    
    // Use zero address if no referrer provided
    const referrer = referrerAddress || "0x0000000000000000000000000000000000000000";
    
    setIsProcessing(true);
    
    try {
      // Step 1: Approve USDT
      toast({
        title: "Step 1/2",
        description: "Approving USDT payment...",
      });
      
      await approveUSDT(connectedWallet);
      
      // Step 2: Mint NFT
      toast({
        title: "Step 2/2",
        description: "Minting your founding deed...",
      });
      
      await mintNFT(referrer);
      
      // Success
      setHasMinted(true);
      setStep('success');
      const newReferralLink = generateReferralLink(connectedWallet);
      setReferralLink(newReferralLink);
      
      toast({
        title: "Success!",
        description: "Your founding deed has been minted successfully!",
      });
      
    } catch (error: any) {
      console.error('Minting failed:', error);
      toast({
        title: "Minting Failed",
        description: error.message || "Transaction failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  return (
    <section className="py-24 px-6" id="dapp">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-gradient-primary">Reserve Your Seat</span>
            <br />
            <span className="text-gradient-gold">Among the 100,000 Partners</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* NFT Display */}
          <div className="flex justify-center">
            <Card className="card-glow p-8 max-w-sm">
              <img 
                src="/lovable-uploads/22230950-ddba-4779-ad05-4a2618a54047.png" 
                alt="ReferPay Founding Deed NFT" 
                className="w-full h-auto rounded-lg mb-6 float-animation"
              />
              <div className="text-center">
                <h3 className="text-xl font-bold text-gradient-gold mb-2">
                  ReferPay Founding Deed
                </h3>
                <p className="text-sm text-muted-foreground">
                  One of 100,000 Founding Deeds
                </p>
              </div>
            </Card>
          </div>

          {/* dApp Interface */}
          <div className="space-y-6">
            <Card className="card-glow p-8">
              {step === 'connect' && (
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
                    onClick={handleConnectWallet}
                    className="btn-glow-primary w-full text-lg py-6"
                  >
                    <Wallet className="mr-2 h-5 w-5" />
                    Connect Wallet
                  </Button>
                </div>
              )}

              {step === 'mint' && (
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
                      <Input
                        id="referrer"
                        value={referrerAddress}
                        onChange={(e) => setReferrerAddress(e.target.value)}
                        placeholder="0x... (Leave empty if none)"
                        className="mt-2"
                      />
                    </div>

                    <div className="bg-card/50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Investment Amount:</span>
                        <span className="font-bold text-primary">5 USDT</span>
                      </div>
                    </div>

                    <Button 
                      onClick={handleMint}
                      disabled={isProcessing}
                      className="btn-glow-gold w-full text-lg py-6"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="mr-2 h-5 w-5" />
                          Confirm Contribution & Claim Deed (5 USDT)
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {step === 'success' && (
                <div className="space-y-6 text-center">
                  <div>
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gradient-gold mb-2">
                      Welcome, Partner!
                    </h3>
                    <p className="text-muted-foreground">
                      Your founding deed has been successfully minted!
                    </p>
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
                        onClick={copyReferralLink}
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
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DAppSection;