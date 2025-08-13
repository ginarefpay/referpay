
import { useUserWallet } from './useUserWallet';
import { useContractState } from './useContractState';
import { usePartnershipStatus } from './usePartnershipStatus';
import { useReferralAnalytics } from './useReferralAnalytics';
import { generateReferralLink, getReferrerFromURL } from '@/lib/web3';
import { useState, useEffect } from 'react';

export const useSmartContractData = () => {
  const [referrerAddress, setReferrerAddress] = useState<string>('');
  
  // Use specialized hooks
  const wallet = useUserWallet();
  const contract = useContractState();
  const partnership = usePartnershipStatus(wallet.connectedWallet);
  const referrals = useReferralAnalytics(wallet.connectedWallet);

  // Initialize referrer from URL
  useEffect(() => {
    const urlReferrer = getReferrerFromURL();
    if (urlReferrer) {
      setReferrerAddress(urlReferrer);
      console.log('🔗 Referrer from URL:', urlReferrer);
    }
  }, []);

  // Generate referral link for partners
  const referralLink = partnership.isPartner && wallet.connectedWallet 
    ? generateReferralLink(wallet.connectedWallet)
    : '';

  // Combined loading state
  const isLoading = contract.isLoading || partnership.isLoading || referrals.isLoading;

  // Refresh all data
  const refreshAll = () => {
    console.log('🔄 Refreshing all contract data...');
    contract.refresh();
    partnership.refresh();
    referrals.refresh();
  };

  return {
    // Wallet state
    wallet,
    
    // Contract state
    contract,
    
    // Partnership status
    partnership,
    
    // Referral analytics
    referrals,
    
    // Referrer management
    referrerAddress,
    setReferrerAddress,
    referralLink,
    
    // Global state
    isLoading,
    refreshAll,
    
    // Helper getters
    get userState() {
      if (!wallet.isConnected) return 'not_connected';
      return partnership.status;
    },
    
    get isReady() {
      return !isLoading && wallet.isConnected;
    }
  };
};
