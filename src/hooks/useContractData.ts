import { useState, useEffect, useCallback } from 'react';
import { getContractInfo, getUserNFTBalance } from '@/lib/web3';

// Cache for contract data
const contractCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 30000; // 30 seconds

export const useContractData = () => {
  const [contractInfo, setContractInfo] = useState({
    maxSupply: 100000,
    totalSupply: 0,
    remainingSupply: 100000,
    mintPrice: 5000000,
    isPaused: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<number>(0);

  const fetchContractInfo = useCallback(async (forceRefresh = false) => {
    const cacheKey = 'contractInfo';
    const cached = contractCache.get(cacheKey);
    const now = Date.now();

    // Use cache if available and not expired, unless force refresh
    if (!forceRefresh && cached && (now - cached.timestamp) < CACHE_DURATION) {
      setContractInfo(cached.data);
      setLastUpdate(cached.timestamp);
      return cached.data;
    }

    setIsLoading(true);
    try {
      const info = await getContractInfo();
      
      // Cache the result
      contractCache.set(cacheKey, { data: info, timestamp: now });
      
      setContractInfo(info);
      setLastUpdate(now);
      return info;
    } catch (error) {
      console.error('Failed to load contract info:', error);
      return contractInfo; // Return current state on error
    } finally {
      setIsLoading(false);
    }
  }, [contractInfo]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    fetchContractInfo();
    
    const interval = setInterval(() => {
      fetchContractInfo();
    }, CACHE_DURATION);

    return () => clearInterval(interval);
  }, [fetchContractInfo]);

  return {
    contractInfo,
    isLoading,
    lastUpdate,
    refreshContractInfo: () => fetchContractInfo(true)
  };
};

export const useUserNFTData = (userAddress: string) => {
  const [nftBalance, setNftBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = useCallback(async (forceRefresh = false) => {
    if (!userAddress) {
      setNftBalance(0);
      return;
    }

    const cacheKey = `userNFT_${userAddress}`;
    const cached = contractCache.get(cacheKey);
    const now = Date.now();

    if (!forceRefresh && cached && (now - cached.timestamp) < CACHE_DURATION) {
      setNftBalance(cached.data);
      return cached.data;
    }

    setIsLoading(true);
    try {
      const balance = await getUserNFTBalance(userAddress);
      
      contractCache.set(cacheKey, { data: balance, timestamp: now });
      setNftBalance(balance);
      return balance;
    } catch (error) {
      console.error('Failed to load user NFT data:', error);
      return nftBalance;
    } finally {
      setIsLoading(false);
    }
  }, [userAddress, nftBalance]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return {
    nftBalance,
    isLoading,
    refreshUserData: () => fetchUserData(true)
  };
};