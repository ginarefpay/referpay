import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  connectWallet,
  checkMintStatus,
  generateReferralLink,
  getReferrerFromURL
} from "@/lib/web3";
import { useContractData, useUserNFTData } from "./useContractData";

export const useWeb3State = () => {
  const [connectedWallet, setConnectedWallet] = useState<string>("");
  const [referrerAddress, setReferrerAddress] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasMinted, setHasMinted] = useState(false);
  const [referralLink, setReferralLink] = useState<string>("");
  const [step, setStep] = useState<'connect' | 'mint' | 'success'>('connect');
  const { toast } = useToast();
  
  // Use separated hooks for better performance and caching
  const { contractInfo, isLoading, refreshContractInfo } = useContractData();
  const { nftBalance: userNFTBalance, refreshUserData } = useUserNFTData(connectedWallet);

  // Contract info is now handled by useContractData hook

  // Check referrer from URL
  useEffect(() => {
    const urlReferrer = getReferrerFromURL();
    if (urlReferrer) {
      setReferrerAddress(urlReferrer);
    }
  }, []);

  // Check if user already minted
  useEffect(() => {
    if (connectedWallet) {
      checkMintStatus(connectedWallet).then((mintCount) => {
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

  const refreshAllData = async () => {
    await Promise.all([
      refreshContractInfo(),
      connectedWallet ? refreshUserData() : Promise.resolve()
    ]);
  };

  return {
    // State
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
    
    // Actions
    handleConnectWallet,
    refreshContractInfo,
    refreshAllData,
    toast
  };
};