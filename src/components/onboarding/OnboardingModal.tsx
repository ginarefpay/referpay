
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Wallet, DollarSign, Network, ArrowRight } from "lucide-react";

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const OnboardingModal = ({ open, onClose, onComplete }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to ReferPay",
      icon: <Wallet className="h-8 w-8 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            You're about to join the ReferPay partnership program. Let's make sure you're ready!
          </p>
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">What you'll need:</h4>
            <ul className="text-sm space-y-1">
              <li>• A Web3 wallet (MetaMask recommended)</li>
              <li>• At least $5 USDC for partnership fee</li>
              <li>• Small amount of POL for gas fees</li>
              <li>• Connection to Polygon network</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Set Up Your Wallet",
      icon: <Wallet className="h-8 w-8 text-blue-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            If you don't have a Web3 wallet yet, you'll need to install one:
          </p>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommended: MetaMask</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                MetaMask is the most popular Web3 wallet and works seamlessly with ReferPay.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.open('https://metamask.io/download/', '_blank')}
              >
                Download MetaMask
              </Button>
            </CardContent>
          </Card>
          <p className="text-xs text-muted-foreground">
            Already have a wallet? Great! Make sure it's installed and ready to use.
          </p>
        </div>
      )
    },
    {
      title: "Fund Your Wallet",
      icon: <DollarSign className="h-8 w-8 text-green-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            You'll need USDC and POL tokens on the Polygon network:
          </p>
          <div className="grid gap-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Badge variant="outline">Required</Badge>
                  $5.00 USDC
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">
                  Partnership fee - you'll earn this back with your first 5 referrals
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Badge variant="outline">Required</Badge>
                  ~$2.00 POL
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">
                  For transaction fees on Polygon network
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg">
            <p className="text-xs text-yellow-600">
              💡 Tip: You can buy USDC and POL directly in MetaMask or use exchanges like Coinbase, Binance, or Uniswap.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Polygon Network",
      icon: <Network className="h-8 w-8 text-purple-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            ReferPay operates on the Polygon network for fast, low-cost transactions.
          </p>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Network Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Network:</span>
                <span>Polygon Mainnet</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Chain ID:</span>
                <span>137</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Currency:</span>
                <span>POL</span>
              </div>
            </CardContent>
          </Card>
          <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg">
            <p className="text-xs text-blue-600">
              Don't worry! We'll automatically prompt you to add/switch to Polygon when you connect your wallet.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "You're Ready!",
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
      content: (
        <div className="space-y-4 text-center">
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 rounded-lg border border-green-500/20">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">All Set!</h3>
            <p className="text-muted-foreground mb-4">
              You're ready to connect your wallet and join the ReferPay partnership program.
            </p>
            <ul className="text-sm text-left space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Wallet ready
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Funds available
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Network understood
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            Click "Connect Wallet" to begin your ReferPay journey!
          </p>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {steps[currentStep].icon}
            {steps[currentStep].title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center gap-2">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index <= currentStep ? 'bg-primary' : 'bg-muted'
                  }`} 
                />
                {index < steps.length - 1 && (
                  <div 
                    className={`w-8 h-0.5 transition-colors ${
                      index < currentStep ? 'bg-primary' : 'bg-muted'
                    }`} 
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div>
            {steps[currentStep].content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {currentStep + 1} of {steps.length}
              </span>
            </div>
            <Button onClick={handleNext} className="btn-glow-primary">
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
