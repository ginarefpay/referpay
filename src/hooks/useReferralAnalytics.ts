
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { USDC_CONTRACT_ADDRESS, CONTRACT_ADDRESS } from '@/lib/web3/config';
import { getReadProvider } from '@/lib/web3/wallet';

interface ReferralTransaction {
  hash: string;
  from: string;
  amount: number;
  timestamp: Date;
  blockNumber: number;
}

interface ReferralAnalytics {
  totalReferrals: number;
  totalEarnings: number;
  recentTransactions: ReferralTransaction[];
  lastUpdated: Date;
}

// Enhanced scanning configuration
const SCAN_CONFIG = {
  CHUNK_SIZE: 2000,
  MAX_BLOCKS_TO_SCAN: 500000, // Increased for better coverage
  REFERRAL_PAYMENT_AMOUNT: 1000000n, // Exactly 1 USDC (6 decimals)
  CACHE_DURATION: 300000, // 5 minutes
  MAX_RECENT_TXS: 50
};

const analyticsCache = new Map<string, { data: ReferralAnalytics; timestamp: number }>();

export const useReferralAnalytics = (walletAddress: string) => {
  const [analytics, setAnalytics] = useState<ReferralAnalytics>({
    totalReferrals: 0,
    totalEarnings: 0,
    recentTransactions: [],
    lastUpdated: new Date()
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scanUserWalletForReferrals = useCallback(async (userAddress: string): Promise<ReferralTransaction[]> => {
    const provider = getReadProvider();
    const transactions: ReferralTransaction[] = [];
    
    console.log('🔍 Scanning user wallet for referral payments...');
    
    try {
      const currentBlock = await provider.getBlockNumber();
      const fromBlock = Math.max(1, currentBlock - SCAN_CONFIG.MAX_BLOCKS_TO_SCAN);
      
      console.log(`📊 Scanning blocks ${fromBlock} to ${currentBlock} for wallet ${userAddress.slice(0, 8)}...`);
      
      // Create precise filter for USDC transfers FROM our contract TO user
      const transferEventSignature = ethers.id("Transfer(address,address,uint256)");
      const contractAddressTopic = ethers.zeroPadValue(CONTRACT_ADDRESS.toLowerCase(), 32);
      const userAddressTopic = ethers.zeroPadValue(userAddress.toLowerCase(), 32);
      
      // Scan in optimized chunks
      for (let startBlock = fromBlock; startBlock <= currentBlock; startBlock += SCAN_CONFIG.CHUNK_SIZE) {
        const endBlock = Math.min(startBlock + SCAN_CONFIG.CHUNK_SIZE - 1, currentBlock);
        
        const filter = {
          address: USDC_CONTRACT_ADDRESS,
          topics: [
            transferEventSignature,
            contractAddressTopic, // from: our contract
            userAddressTopic      // to: user address
          ],
          fromBlock: startBlock,
          toBlock: endBlock
        };
        
        try {
          const logs = await provider.getLogs(filter);
          
          for (const log of logs) {
            try {
              // Decode transfer event
              const iface = new ethers.Interface([
                "event Transfer(address indexed from, address indexed to, uint256 value)"
              ]);
              
              const decoded = iface.parseLog(log);
              if (!decoded) continue;
              
              const rawAmount = decoded.args.value;
              
              // Only count exact 1 USDC payments (referral payments)
              if (rawAmount !== SCAN_CONFIG.REFERRAL_PAYMENT_AMOUNT) {
                continue;
              }
              
              const amount = Number(ethers.formatUnits(rawAmount, 6));
              
              // Get block timestamp
              const block = await provider.getBlock(log.blockNumber);
              const timestamp = new Date((block?.timestamp || 0) * 1000);
              
              transactions.push({
                hash: log.transactionHash,
                from: decoded.args.from,
                amount,
                timestamp,
                blockNumber: log.blockNumber
              });
              
              console.log(`💰 Referral payment found: $${amount} USDC (Block: ${log.blockNumber})`);
            } catch (decodeError) {
              console.warn('⚠️ Failed to decode log:', decodeError);
            }
          }
          
          // Small delay to avoid overwhelming RPC
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (chunkError) {
          console.error(`❌ Failed to scan chunk ${startBlock}-${endBlock}:`, chunkError);
        }
      }
      
      // Sort by timestamp (newest first)
      transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      
      console.log(`✅ Scan complete: Found ${transactions.length} referral payments`);
      return transactions;
      
    } catch (error) {
      console.error('❌ Referral scanning failed:', error);
      throw error;
    }
  }, []);

  const loadAnalytics = useCallback(async (forceRefresh = false) => {
    if (!walletAddress) {
      setAnalytics({
        totalReferrals: 0,
        totalEarnings: 0,
        recentTransactions: [],
        lastUpdated: new Date()
      });
      return;
    }

    // Check cache first
    const cacheKey = `analytics_${walletAddress.toLowerCase()}`;
    const cached = analyticsCache.get(cacheKey);
    
    if (!forceRefresh && cached && (Date.now() - cached.timestamp) < SCAN_CONFIG.CACHE_DURATION) {
      console.log('📋 Using cached analytics data');
      setAnalytics(cached.data);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      console.log('📊 Loading referral analytics from blockchain...');
      
      const transactions = await scanUserWalletForReferrals(walletAddress);
      
      const analyticsData: ReferralAnalytics = {
        totalReferrals: transactions.length,
        totalEarnings: transactions.reduce((sum, tx) => sum + tx.amount, 0),
        recentTransactions: transactions.slice(0, SCAN_CONFIG.MAX_RECENT_TXS),
        lastUpdated: new Date()
      };
      
      // Cache the results
      analyticsCache.set(cacheKey, {
        data: analyticsData,
        timestamp: Date.now()
      });
      
      setAnalytics(analyticsData);
      
      console.log(`✅ Analytics loaded: ${analyticsData.totalReferrals} referrals, $${analyticsData.totalEarnings.toFixed(2)} earned`);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load referral analytics';
      setError(errorMessage);
      console.error('❌ Analytics loading failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress, scanUserWalletForReferrals]);

  // Auto-load when wallet changes
  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  const clearCache = useCallback(() => {
    if (walletAddress) {
      const cacheKey = `analytics_${walletAddress.toLowerCase()}`;
      analyticsCache.delete(cacheKey);
      console.log('🗑️ Analytics cache cleared');
    }
  }, [walletAddress]);

  const refresh = useCallback(() => {
    clearCache();
    loadAnalytics(true);
  }, [clearCache, loadAnalytics]);

  return {
    analytics,
    isLoading,
    error,
    refresh,
    clearCache
  };
};
