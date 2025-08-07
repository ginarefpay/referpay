
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { connectWallet, generateReferralLink, getReferrerFromURL } from "@/lib/web3";
import { 
  getEnhancedContractInfo, 
  getEnhancedUserData,
  enhancedMintNFT,
  enhancedApproveUSDC,
  checkUSDCAllowance
} from "@/lib/web3/enhanced-contracts";
import { 
  trackReferral, 
  getReferralStats, 
  initializeMockReferrals,
  ReferralStats 
} from "@/lib/referral/tracking";
import { Web3Error, getErrorMessage } from "@/lib/web3/errors";

export interface EnhancedWeb3State {
  // Connection state
  connectedWallet: string;
  isConnecting: boolean;
  
  // Contract data
  contractInfo: {
    maxSupply: number;
    totalSupply: number;
    remainingSupply: number;
    mintPrice: number;
    isPaused: boolean;
  };
  
  // User data
  userData: {
    nftBalance: number;
    mintCount: number;
    referralCount: number;
    totalEarnings: number;
  };
  
  // Referral data
  referralStats: ReferralStats;
  referrerAddress: string;
  referralLink: string;
  
  // Transaction state
  isProcessing: boolean;
  hasMinted: boolean;
  step: 'connect' | 'approve' | 'mint' | 'success';
  
  // Loading states
  isLoadingContract: boolean;
  isLoadingUser: boolean;
}

export const useEnhancedWeb3 = () => {
  const [state, setState] = useState<EnhancedWeb3State>({
    connectedWallet: "",
    isConnecting: false,
    contractInfo: {
      maxSupply: 100000,
      totalSupply: 0,
      remainingSupply: 100000,
      mintPrice: 5000000,
      isPaused: false
    },
    userData: {
      nftBalance: 0,
      mintCount: 0,
      referralCount: 0,
      totalEarnings: 0
    },
    referralStats: {
      totalReferrals: 0,
      totalEarnings: 0,
      pendingPayouts: 0,
      activeReferrals: 0
    },
    referrerAddress: "",
    referralLink: "",
    isProcessing: false,
    hasMinted: false,
    step: 'connect',
    isLoadingContract: false,
    isLoadingUser: false
  });

  const { toast } = useToast();

  // Initialize referrer from URL
  useEffect(() => {
    const urlReferrer = getReferrerFromURL();
    if (urlReferrer) {
      setState(prev => ({ ...prev, referrerAddress: urlReferrer }));
    }
  }, []);

  // Load contract info
  const loadContractInfo = useCallback(async () => {
    setState(prev => ({ ...prev, isLoadingContract: true }));
    try {
      const contractInfo = await getEnhancedContractInfo();
      setState(prev => ({ ...prev, contractInfo, isLoadingContract: false }));
    } catch (error) {
      console.error('Failed to load contract info:', error);
      setState(prev => ({ ...prev, isLoadingContract: false }));
      toast({
        title: "Error",
        description: `Failed to load contract info: ${getErrorMessage(error)}`,
        variant: "destructive",
      });
    }
  }, [toast]);

  // Load user data
  const loadUserData = useCallback(async (userAddress: string) => {
    if (!userAddress) return;
    
    setState(prev => ({ ...prev, isLoadingUser: true }));
    try {
      const userData = await getEnhancedUserData(userAddress);
      const referralStats = getReferralStats(userAddress);
      
      // Initialize mock data if needed
      initializeMockReferrals(userAddress);
      
      setState(prev => ({ 
        ...prev, 
        userData, 
        referralStats,
        hasMinted: userData.mintCount > 0,
        step: userData.mintCount > 0 ? 'success' : 'approve',
        referralLink: generateReferralLink(userAddress),
        isLoadingUser: false
      }));
    } catch (error) {
      console.error('Failed to load user data:', error);
      setState(prev => ({ ...prev, isLoadingUser: false }));
    }
  }, []);

  // Connect wallet
  const handleConnectWallet = useCallback(async () => {
    setState(prev => ({ ...prev, isConnecting: true }));
    try {
      const address = await connectWallet();
      if (address) {
        setState(prev => ({ ...prev, connectedWallet: address, isConnecting: false, step: 'approve' }));
        await loadUserData(address);
        toast({
          title: "Wallet Connected",
          description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
        });
      }
    } catch (error) {
      setState(prev => ({ ...prev, isConnecting: false }));
      toast({
        title: "Connection Failed",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  }, [loadUserData, toast]);

  // Handle minting process
  const handleMint = useCallback(async () => {
    if (!state.connectedWallet) return;

    setState(prev => ({ ...prev, isProcessing: true }));
    
    try {
      // Check USDC allowance first
      const allowance = await checkUSDCAllowance(state.connectedWallet);
      
      if (allowance < state.contractInfo.mintPrice) {
        // Need to approve first
        setState(prev => ({ ...prev, step: 'approve' }));
        const approvalResult = await enhancedApproveUSDC(state.connectedWallet);
        
        if (approvalResult.status !== 'confirmed') {
          throw new Error('USDC approval failed');
        }
      }

      // Proceed with minting
      setState(prev => ({ ...prev, step: 'mint' }));
      const mintResult = await enhancedMintNFT(state.referrerAddress);
      
      if (mintResult.status === 'confirmed') {
        // Track referral if there was a referrer
        if (state.referrerAddress) {
          trackReferral(state.referrerAddress, state.connectedWallet, mintResult.hash);
        }
        
        setState(prev => ({ 
          ...prev, 
          hasMinted: true, 
          step: 'success',
          isProcessing: false
        }));
        
        // Refresh data
        await loadUserData(state.connectedWallet);
        
        toast({
          title: "Minting Successful!",
          description: "Your NFT has been minted successfully",
        });
      }
    } catch (error) {
      setState(prev => ({ ...prev, isProcessing: false }));
      toast({
        title: "Minting Failed",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  }, [state.connectedWallet, state.referrerAddress, state.contractInfo.mintPrice, loadUserData, toast]);

  // Load contract info on mount
  useEffect(() => {
    loadContractInfo();
  }, [loadContractInfo]);

  // Load user data when wallet connects
  useEffect(() => {
    if (state.connectedWallet) {
      loadUserData(state.connectedWallet);
    }
  }, [state.connectedWallet, loadUserData]);

  return {
    ...state,
    actions: {
      connectWallet: handleConnectWallet,
      mint: handleMint,
      refreshData: () => {
        loadContractInfo();
        if (state.connectedWallet) {
          loadUserData(state.connectedWallet);
        }
      },
      setReferrerAddress: (address: string) => 
        setState(prev => ({ ...prev, referrerAddress: address }))
    }
  };
};
