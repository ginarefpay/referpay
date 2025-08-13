
import { useState, useEffect, useCallback } from 'react';
import { getUserNFTBalance } from '@/lib/web3/contracts';

export type PartnershipStatus = 'not_connected' | 'checking' | 'new_user' | 'partner';

export const usePartnershipStatus = (walletAddress: string) => {
  const [status, setStatus] = useState<PartnershipStatus>('not_connected');
  const [nftBalance, setNftBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const checkPartnershipStatus = useCallback(async () => {
    if (!walletAddress) {
      setStatus('not_connected');
      setNftBalance(0);
      return;
    }

    setIsLoading(true);
    setStatus('checking');
    
    try {
      console.log('🔍 Checking partnership status for:', walletAddress);
      
      // Get NFT balance directly from contract
      const balance = await getUserNFTBalance(walletAddress);
      setNftBalance(balance);
      
      const newStatus: PartnershipStatus = balance > 0 ? 'partner' : 'new_user';
      setStatus(newStatus);
      
      console.log(`✅ Partnership status: ${newStatus} (NFTs: ${balance})`);
    } catch (error) {
      console.error('❌ Partnership status check failed:', error);
      setStatus('new_user'); // Default to new user on error
      setNftBalance(0);
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress]);

  useEffect(() => {
    checkPartnershipStatus();
  }, [checkPartnershipStatus]);

  return {
    status,
    nftBalance,
    isLoading,
    isPartner: status === 'partner',
    refresh: checkPartnershipStatus
  };
};
