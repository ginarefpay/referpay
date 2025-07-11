import { Card } from "@/components/ui/card";
import { generateReferralLink } from "@/lib/web3";
import { useWeb3State } from "@/hooks/useWeb3State";
import ContractStats from "./dapp/ContractStats";
import WalletConnect from "./dapp/WalletConnect";
import MintingForm from "./dapp/MintingForm";
import MintSuccess from "./dapp/MintSuccess";
import NFTDisplay from "./dapp/NFTDisplay";

const DAppSection = () => {
  const {
    connectedWallet,
    referrerAddress,
    setReferrerAddress,
    isProcessing,
    setIsProcessing,
    hasMinted,
    setHasMinted,
    referralLink,
    setReferralLink,
    step,
    setStep,
    contractInfo,
    userNFTBalance,
    isLoading,
    handleConnectWallet,
    refreshContractInfo,
    refreshAllData,
    toast
  } = useWeb3State();

  const handleMintStart = () => {
    setIsProcessing(true);
  };

  const handleMintSuccess = async () => {
    setHasMinted(true);
    setStep('success');
    const newReferralLink = generateReferralLink(connectedWallet);
    setReferralLink(newReferralLink);
    setIsProcessing(false);
    
    // Refresh all data after successful mint
    await refreshAllData();
  };

  const handleMintError = () => {
    setIsProcessing(false);
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
          
          <ContractStats contractInfo={contractInfo} isLoading={isLoading} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <NFTDisplay />

          {/* dApp Interface */}
          <div className="space-y-6">
            <Card className="card-glow p-8">
              {step === 'connect' && (
                <WalletConnect onConnect={handleConnectWallet} />
              )}

              {step === 'mint' && (
                <MintingForm
                  connectedWallet={connectedWallet}
                  referrerAddress={referrerAddress}
                  setReferrerAddress={setReferrerAddress}
                  contractInfo={contractInfo}
                  isProcessing={isProcessing}
                  onMintStart={handleMintStart}
                  onMintSuccess={handleMintSuccess}
                  onMintError={handleMintError}
                  toast={toast}
                />
              )}

              {step === 'success' && (
                <MintSuccess
                  referralLink={referralLink}
                  userNFTBalance={userNFTBalance}
                  onCopyReferralLink={copyReferralLink}
                />
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DAppSection;