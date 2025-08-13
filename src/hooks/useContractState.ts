
import { useState, useEffect, useCallback } from 'react';
import { getContractInfo } from '@/lib/web3/contracts';

interface ContractState {
  maxSupply: number;
  totalSupply: number;
  remainingSupply: number;
  mintPrice: number;
  isPaused: boolean;
}

export const useContractState = () => {
  const [contractState, setContractState] = useState<ContractState>({
    maxSupply: 100000,
    totalSupply: 0,
    remainingSupply: 100000,
    mintPrice: 5000000,
    isPaused: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContractState = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('📡 Loading contract state from smart contract...');
      
      const contractInfo = await getContractInfo();
      setContractState(contractInfo);
      
      console.log('✅ Contract state loaded:', contractInfo);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load contract state';
      setError(errorMessage);
      console.error('❌ Contract state loading failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    loadContractState();
    
    const interval = setInterval(loadContractState, 30000);
    return () => clearInterval(interval);
  }, [loadContractState]);

  return {
    contractState,
    isLoading,
    error,
    refresh: loadContractState
  };
};
