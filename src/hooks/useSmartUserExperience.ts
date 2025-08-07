
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { connectWallet, generateReferralLink, getReferrerFromURL } from '@/lib/web3';
import { 
  getEnhancedContractInfo, 
  getEnhancedUserData,
  enhancedMintNFT,
  enhancedApproveUSDC,
  checkUSDCAllowance
} from '@/lib/web3/enhanced-contracts';
import { 
  getReferralStats, 
  initializeMockReferrals,
  trackReferral,
  ReferralStats 
} from '@/lib/referral/tracking';
import { isPartner } from '@/lib/web3/partner-utils';
import { getErrorMessage } from '@/lib/web3/errors';

export type UserState = 'disconnected' | 'checking' | 'new_user' | 'partner';

export interface SmartUserExperienceState {
  // Connection state
  connectedWallet: string;
  userState: UserState;
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
  
  // Loading states
  isLoadingContract: boolean;
  isLoadingUser: boolean;
}

export const useSmartUserExperience = () => {
  const [state, setState] = useState<SmartUserExperienceState>({
    connectedWallet: '',
    userState: 'disconnected',
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
    referrerAddress: '',
    referralLink: '',
    isProcessing: false,
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

  // Check user partnership status
  const checkUserStatus = useCallback(async (userAddress: string) => {
    setState(prev => ({ ...prev, userState: 'checking', isLoadingUser: true }));
    
    try {
      const [partnerStatus, userData, referralStats] = await Promise.all([
        isPartner(userAddress),
        getEnhancedUserData(userAddress),
        Promise.resolve(getReferralStats(userAddress))
      ]);

      // Initialize mock data if needed
      initializeMockReferrals(userAddress);

      const newUserState: UserState = partnerStatus ? 'partner' : 'new_user';
      
      setState(prev => ({
        ...prev,
        userState: newUserState,
        userData,
        referralStats,
        referralLink: partnerStatus ? generateReferralLink(userAddress) : '',
        isLoadingUser: false
      }));

      if (partnerStatus) {
        toast({
          title: "Welcome Back, Partner!",
          description: "Your dashboard is ready",
        });
      }
    } catch (error) {
      console.error('Failed to check user status:', error);
      setState(prev => ({ 
        ...prev, 
        userState: 'new_user', 
        isLoadingUser: false 
      }));
    }
  }, [toast]);

  // Connect wallet
  const handleConnectWallet = useCallback(async () => {
    setState(prev => ({ ...prev, isConnecting: true }));
    try {
      const address = await connectWallet();
      if (address) {
        setState(prev => ({ 
          ...prev, 
          connectedWallet: address, 
          isConnecting: false 
        }));
        
        // Automatically check user status
        await checkUserStatus(address);
        
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
  }, [checkUserStatus, toast]);

  // Handle participation (minting)
  const handleParticipate = useCallback(async () => {
    if (!state.connectedWallet || state.userState !== 'new_user') return;

    setState(prev => ({ ...prev, isProcessing: true }));
    
    try {
      // Check USDC allowance first
      const allowance = await checkUSDCAllowance(state.connectedWallet);
      
      if (allowance < state.contractInfo.mintPrice) {
        toast({
          title: "Approving Payment",
          description: "Please approve USDC spending...",
        });
        
        const approvalResult = await enhancedApproveUSDC(state.connectedWallet);
        
        if (approvalResult.status !== 'confirmed') {
          throw new Error('USDC approval failed');
        }
      }

      // Proceed with minting
      toast({
        title: "Joining ReferPay",
        description: "Minting your founding deed...",
      });
      
      const mintResult = await enhancedMintNFT(state.referrerAddress);
      
      if (mintResult.status === 'confirmed') {
        // Track referral if there was a referrer
        if (state.referrerAddress) {
          trackReferral(state.referrerAddress, state.connectedWallet, mintResult.hash);
        }
        
        // Transition to partner state
        setState(prev => ({ 
          ...prev, 
          userState: 'partner',
          isProcessing: false,
          referralLink: generateReferralLink(state.connectedWallet)
        }));
        
        // Refresh data
        await checkUserStatus(state.connectedWallet);
        
        toast({
          title: "Welcome to ReferPay!",
          description: "Your partnership is now active. Start earning with your referral link!",
        });
      }
    } catch (error) {
      setState(prev => ({ ...prev, isProcessing: false }));
      toast({
        title: "Participation Failed",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  }, [state.connectedWallet, state.userState, state.referrerAddress, state.contractInfo.mintPrice, checkUserStatus, toast]);

  // Load contract info on mount
  useEffect(() => {
    loadContractInfo();
  }, [loadContractInfo]);

  return {
    ...state,
    actions: {
      connectWallet: handleConnectWallet,
      participate: handleParticipate,
      refreshData: () => {
        loadContractInfo();
        if (state.connectedWallet) {
          checkUserStatus(state.connectedWallet);
        }
      },
      setReferrerAddress: (address: string) => 
        setState(prev => ({ ...prev, referrerAddress: address }))
    }
  };
};
