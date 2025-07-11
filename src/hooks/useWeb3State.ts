import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  connectWallet,
  checkMintStatus,
  generateReferralLink,
  getReferrerFromURL,
  getContractInfo,
  getUserNFTBalance
} from "@/lib/web3";

export const useWeb3State = () => {
  const [connectedWallet, setConnectedWallet] = useState<string>("");
  const [referrerAddress, setReferrerAddress] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasMinted, setHasMinted] = useState(false);
  const [referralLink, setReferralLink] = useState<string>("");
  const [step, setStep] = useState<'connect' | 'mint' | 'success'>('connect');
  const [contractInfo, setContractInfo] = useState({
    maxSupply: 100000,
    totalSupply: 0,
    remainingSupply: 100000,
    mintPrice: 5000000,
    isPaused: false
  });
  const [userNFTBalance, setUserNFTBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load contract info on component mount
  useEffect(() => {
    const loadContractInfo = async () => {
      setIsLoading(true);
      try {
        const info = await getContractInfo();
        setContractInfo(info);
      } catch (error) {
        console.error('Failed to load contract info:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContractInfo();
  }, []);

  // Check referrer from URL
  useEffect(() => {
    const urlReferrer = getReferrerFromURL();
    if (urlReferrer) {
      setReferrerAddress(urlReferrer);
    }
  }, []);

  // Check if user already minted and get their NFT balance
  useEffect(() => {
    if (connectedWallet) {
      Promise.all([
        checkMintStatus(connectedWallet),
        getUserNFTBalance(connectedWallet)
      ]).then(([mintCount, nftBalance]) => {
        setUserNFTBalance(nftBalance);
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

  const refreshContractInfo = async () => {
    try {
      const [newContractInfo, newNFTBalance] = await Promise.all([
        getContractInfo(),
        connectedWallet ? getUserNFTBalance(connectedWallet) : Promise.resolve(0)
      ]);
      
      setContractInfo(newContractInfo);
      if (connectedWallet) {
        setUserNFTBalance(newNFTBalance);
      }
    } catch (error) {
      console.error('Failed to refresh contract info:', error);
    }
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
    toast
  };
};