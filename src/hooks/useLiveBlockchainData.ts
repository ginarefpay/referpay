
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { connectWallet, generateReferralLink, getReferrerFromURL } from '@/lib/web3';
import { 
  getLiveContractInfo, 
  isPartnerLive, 
  LiveContractInfo 
} from '@/lib/web3/live-contract-data';
import { getWalletBalances, WalletBalances } from '@/lib/web3/wallet-balances';
import { analyzeReferralEarnings, ReferralStats } from '@/lib/web3/referral-analyzer';
import { 
  enhancedMintNFT,
  enhancedApproveUSDC,
  checkUSDCAllowance
} from '@/lib/web3/enhanced-contracts';
import { getErrorMessage } from '@/lib/web3/errors';

export type UserState = 'disconnected' | 'checking' | 'new_user' | 'partner';

export interface LiveBlockchainState {
  // Connection state
  connectedWallet: string;
  userState: UserState;
  isConnecting: boolean;
  hasEverConnected: boolean;
  
  // Contract data (live)
  contractInfo: LiveContractInfo;
  
  // User data (live)
  walletBalances: WalletBalances;
  referralStats: ReferralStats;
  
  // Referral setup
  referrerAddress: string;
  referralLink: string;
  
  // Transaction state
  isProcessing: boolean;
  
  // Loading states
  isLoadingContract: boolean;
  isLoadingUser: boolean;
}

export const useLiveBlockchainData = () => {
  const [state, setState] = useState<LiveBlockchainState>({
    connectedWallet: '',
    userState: 'disconnected',
    isConnecting: false,
    hasEverConnected: false,
    contractInfo: {
      totalSupply: 0,
      remainingSupply: 100000,
      mintPrice: 5000000,
      isPaused: false
    },
    walletBalances: {
      pol: 0,
      usdc: 0
    },
    referralStats: {
      totalReferrals: 0,
      totalEarnings: 0,
      recentTransactions: []
    },
    referrerAddress: '',
    referralLink: '',
    isProcessing: false,
    isLoadingContract: false,
    isLoadingUser: false
  });

  const { toast } = useToast();

  // Initialize referrer from URL on mount
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
      const contractInfo = await getLiveContractInfo();
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

  // Check user status and load all user data
  const loadUserData = useCallback(async (userAddress: string) => {
    setState(prev => ({ ...prev, userState: 'checking', isLoadingUser: true }));
    
    try {
      console.log('Loading user data for:', userAddress);
      
      const [partnerStatus, balances, referralStats] = await Promise.all([
        isPartnerLive(userAddress),
        getWalletBalances(userAddress),
        analyzeReferralEarnings(userAddress)
      ]);

      const newUserState: UserState = partnerStatus ? 'partner' : 'new_user';
      
      setState(prev => ({
        ...prev,
        userState: newUserState,
        walletBalances: balances,
        referralStats,
        referralLink: partnerStatus ? generateReferralLink(userAddress) : '',
        isLoadingUser: false
      }));

      if (partnerStatus) {
        toast({
          title: "Welcome Back, Partner!",
          description: `You have ${referralStats.totalReferrals} referrals and earned $${referralStats.totalEarnings.toFixed(2)}`,
        });
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
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
          isConnecting: false,
          hasEverConnected: true
        }));
        
        // Load user data immediately after connection
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

  // Handle participation (minting)
  const handleParticipate = useCallback(async () => {
    if (!state.connectedWallet || state.userState !== 'new_user') return;

    setState(prev => ({ ...prev, isProcessing: true }));
    
    try {
      // Check USDC allowance
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

      // Mint NFT
      toast({
        title: "Joining ReferPay",
        description: "Minting your founding deed...",
      });
      
      const mintResult = await enhancedMintNFT(state.referrerAddress);
      
      if (mintResult.status === 'confirmed') {
        // Refresh all data after successful mint
        await Promise.all([
          loadContractInfo(),
          loadUserData(state.connectedWallet)
        ]);
        
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
  }, [state.connectedWallet, state.userState, state.referrerAddress, state.contractInfo.mintPrice, loadContractInfo, loadUserData, toast]);

  // Auto-load contract info on mount
  useEffect(() => {
    loadContractInfo();
  }, [loadContractInfo]);

  // Auto-refresh data every 30 seconds if user is connected
  useEffect(() => {
    if (!state.connectedWallet) return;

    const interval = setInterval(() => {
      loadContractInfo();
      loadUserData(state.connectedWallet);
    }, 30000);

    return () => clearInterval(interval);
  }, [state.connectedWallet, loadContractInfo, loadUserData]);

  return {
    ...state,
    actions: {
      connectWallet: handleConnectWallet,
      participate: handleParticipate,
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
