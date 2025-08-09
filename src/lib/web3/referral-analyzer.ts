
import { ethers } from 'ethers';
import { USDC_CONTRACT_ADDRESS, CONTRACT_ADDRESS } from './config';
import { getReadProvider } from './wallet';

export interface ReferralTransaction {
  hash: string;
  from: string;
  amount: number;
  timestamp: Date;
}

export interface ReferralStats {
  totalReferrals: number;
  totalEarnings: number;
  recentTransactions: ReferralTransaction[];
}

// Configuration optimized for user wallet scanning
const SCAN_CONFIG = {
  CHUNK_SIZE: 5000, // Larger chunks since we're scanning fewer transactions
  MAX_BLOCKS_TO_SCAN: 100000, // Scan more blocks since user wallets have fewer transactions
  REFERRAL_PAYMENT_AMOUNT: 1000000, // Exactly 1 USDC (6 decimals)
  CACHE_DURATION: 300000 // 5 minutes cache
};

// Cache for results and block timestamps
const blockTimestampCache = new Map<number, number>();
const resultsCache = new Map<string, { data: ReferralStats; timestamp: number }>();

/**
 * Get block timestamp with caching
 */
const getBlockTimestamp = async (provider: ethers.Provider, blockNumber: number): Promise<number> => {
  if (blockTimestampCache.has(blockNumber)) {
    return blockTimestampCache.get(blockNumber)!;
  }

  try {
    const block = await provider.getBlock(blockNumber);
    const timestamp = block?.timestamp || Math.floor(Date.now() / 1000);
    blockTimestampCache.set(blockNumber, timestamp);
    return timestamp;
  } catch (error) {
    console.warn(`Failed to get timestamp for block ${blockNumber}:`, error);
    return Math.floor(Date.now() / 1000);
  }
};

/**
 * Scan user wallet for incoming USDC transfers from our contract
 * This is much more efficient than scanning the entire USDC contract
 */
const scanUserWalletForReferrals = async (
  provider: ethers.Provider,
  userAddress: string,
  fromBlock: number,
  toBlock: number
): Promise<ReferralTransaction[]> => {
  const transactions: ReferralTransaction[] = [];
  
  console.log(`Scanning user wallet ${userAddress.slice(0, 8)}... for USDC transfers from blocks ${fromBlock} to ${toBlock}`);
  
  // Create filter for USDC Transfer events TO the user wallet FROM our contract
  const transferEventSignature = ethers.id("Transfer(address,address,uint256)");
  const contractAddressTopic = ethers.zeroPadValue(CONTRACT_ADDRESS.toLowerCase(), 32);
  const userAddressTopic = ethers.zeroPadValue(userAddress.toLowerCase(), 32);
  
  const filter = {
    address: USDC_CONTRACT_ADDRESS,
    topics: [
      transferEventSignature,
      contractAddressTopic, // from: our contract
      userAddressTopic      // to: user address
    ],
    fromBlock,
    toBlock
  };
  
  try {
    const logs = await provider.getLogs(filter);
    console.log(`Found ${logs.length} USDC transfers from contract to user in blocks ${fromBlock}-${toBlock}`);
    
    // Process each transfer log
    for (const log of logs) {
      try {
        // Decode the transfer event
        const iface = new ethers.Interface([
          "event Transfer(address indexed from, address indexed to, uint256 value)"
        ]);
        
        const decoded = iface.parseLog(log);
        if (!decoded) continue;
        
        // Convert amount from USDC raw value (6 decimals)
        const rawAmount = decoded.args.value;
        
        // Only count transactions that are exactly 1 USDC (referral payments)
        if (rawAmount.toString() !== SCAN_CONFIG.REFERRAL_PAYMENT_AMOUNT.toString()) {
          console.log(`Skipping transaction with amount ${rawAmount} (not a referral payment)`);
          continue;
        }
        
        const amount = Number(ethers.formatUnits(rawAmount, 6));
        
        // Get block timestamp
        const timestamp = await getBlockTimestamp(provider, log.blockNumber);
        
        transactions.push({
          hash: log.transactionHash,
          from: decoded.args.from,
          amount,
          timestamp: new Date(timestamp * 1000)
        });
        
        console.log(`✅ Referral payment found: $${amount} USDC at block ${log.blockNumber} (TX: ${log.transactionHash})`);
      } catch (decodeError) {
        console.warn('Failed to decode transfer log:', decodeError);
      }
    }
  } catch (error) {
    console.error(`Error scanning user wallet blocks ${fromBlock}-${toBlock}:`, error);
  }
  
  return transactions;
};

/**
 * Analyze referral earnings by scanning user wallet for incoming USDC transfers
 * This approach is much faster than scanning the entire USDC contract
 */
export const analyzeReferralEarnings = async (userAddress: string): Promise<ReferralStats> => {
  // Check cache first
  const cacheKey = `user_referrals_${userAddress.toLowerCase()}`;
  const cached = resultsCache.get(cacheKey);
  
  if (cached && (Date.now() - cached.timestamp) < SCAN_CONFIG.CACHE_DURATION) {
    console.log('✅ Returning cached referral stats for user');
    return cached.data;
  }
  
  try {
    console.log('=== ANALYZING USER WALLET REFERRAL EARNINGS ===');
    console.log('User address:', userAddress);
    console.log('Contract address:', CONTRACT_ADDRESS);
    console.log('USDC contract:', USDC_CONTRACT_ADDRESS);
    console.log('Target referral amount: $1 USDC');
    
    const provider = getReadProvider();
    const currentBlock = await provider.getBlockNumber();
    
    console.log('Current block:', currentBlock);
    
    // Determine scan range - scan more blocks since user wallets have fewer transactions
    const scanFromBlock = Math.max(1, currentBlock - SCAN_CONFIG.MAX_BLOCKS_TO_SCAN);
    
    console.log(`Scanning user wallet from block ${scanFromBlock} to ${currentBlock} (${currentBlock - scanFromBlock} blocks)`);
    
    // Scan in chunks
    const allTransactions: ReferralTransaction[] = [];
    const chunkSize = SCAN_CONFIG.CHUNK_SIZE;
    
    for (let fromBlock = scanFromBlock; fromBlock <= currentBlock; fromBlock += chunkSize) {
      const toBlock = Math.min(fromBlock + chunkSize - 1, currentBlock);
      
      try {
        const chunkTransactions = await scanUserWalletForReferrals(
          provider,
          userAddress,
          fromBlock,
          toBlock
        );
        allTransactions.push(...chunkTransactions);
        
        // Small delay to avoid overwhelming the RPC
        await new Promise(resolve => setTimeout(resolve, 50));
      } catch (chunkError) {
        console.error(`Failed to scan user wallet chunk ${fromBlock}-${toBlock}:`, chunkError);
        continue;
      }
    }
    
    // Sort transactions by timestamp (newest first)
    allTransactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    // Calculate totals
    const totalEarnings = allTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    const totalReferrals = allTransactions.length;
    
    const stats: ReferralStats = {
      totalReferrals,
      totalEarnings,
      recentTransactions: allTransactions.slice(0, 20) // Show more recent transactions
    };
    
    console.log('=== USER WALLET REFERRAL ANALYSIS COMPLETE ===');
    console.log(`✅ Total referrals found: ${totalReferrals}`);
    console.log(`💰 Total earnings: $${totalEarnings.toFixed(2)} USDC`);
    console.log(`📋 Recent transactions: ${stats.recentTransactions.length}`);
    
    // Cache the results
    resultsCache.set(cacheKey, {
      data: stats,
      timestamp: Date.now()
    });
    
    return stats;
    
  } catch (error) {
    console.error('=== USER WALLET REFERRAL ANALYSIS FAILED ===');
    console.error('Error details:', error);
    
    // Return empty stats on error
    const emptyStats: ReferralStats = {
      totalReferrals: 0,
      totalEarnings: 0,
      recentTransactions: []
    };
    
    return emptyStats;
  }
};

/**
 * Clear caches for manual refresh
 */
export const clearReferralCache = (userAddress?: string) => {
  if (userAddress) {
    const cacheKey = `user_referrals_${userAddress.toLowerCase()}`;
    resultsCache.delete(cacheKey);
    console.log(`🗑️ Cleared cache for user: ${userAddress}`);
  } else {
    resultsCache.clear();
    blockTimestampCache.clear();
    console.log('🗑️ Cleared all referral caches');
  }
};

/**
 * Get cache status for debugging
 */
export const getCacheInfo = () => {
  return {
    resultsCacheSize: resultsCache.size,
    blockCacheSize: blockTimestampCache.size,
    cachedUsers: Array.from(resultsCache.keys())
  };
};
