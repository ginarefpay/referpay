
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

// Configuration for blockchain scanning
const SCAN_CONFIG = {
  CHUNK_SIZE: 2000, // Blocks per chunk
  MAX_BLOCKS_TO_SCAN: 50000, // Total blocks to scan back
  START_BLOCK: 50000000, // Approximate block when contract was deployed
  CACHE_DURATION: 300000 // 5 minutes cache
};

// Cache for block timestamps and results
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
 * Scan blockchain for USDC transfers from contract to user in chunks
 */
const scanReferralTransfers = async (
  provider: ethers.Provider,
  userAddress: string,
  fromBlock: number,
  toBlock: number
): Promise<ReferralTransaction[]> => {
  const transactions: ReferralTransaction[] = [];
  
  console.log(`Scanning blocks ${fromBlock} to ${toBlock} for USDC transfers`);
  
  // Create the Transfer event filter
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
        
        // Convert amount from USDC (6 decimals) to readable number
        const amount = Number(ethers.formatUnits(decoded.args.value, 6));
        
        // Get block timestamp (with caching)
        const timestamp = await getBlockTimestamp(provider, log.blockNumber);
        
        transactions.push({
          hash: log.transactionHash,
          from: decoded.args.from,
          amount,
          timestamp: new Date(timestamp * 1000)
        });
        
        console.log(`Referral payment: $${amount} USDC at block ${log.blockNumber} (${new Date(timestamp * 1000).toLocaleDateString()})`);
      } catch (decodeError) {
        console.warn('Failed to decode transfer log:', decodeError);
      }
    }
  } catch (error) {
    console.error(`Error scanning blocks ${fromBlock}-${toBlock}:`, error);
  }
  
  return transactions;
};

/**
 * Main function to analyze referral earnings from blockchain
 */
export const analyzeReferralEarnings = async (userAddress: string): Promise<ReferralStats> => {
  // Check cache first
  const cacheKey = `referrals_${userAddress.toLowerCase()}`;
  const cached = resultsCache.get(cacheKey);
  
  if (cached && (Date.now() - cached.timestamp) < SCAN_CONFIG.CACHE_DURATION) {
    console.log('Returning cached referral stats');
    return cached.data;
  }
  
  try {
    console.log('=== ANALYZING REFERRAL EARNINGS ===');
    console.log('User address:', userAddress);
    console.log('Contract address:', CONTRACT_ADDRESS);
    console.log('USDC contract:', USDC_CONTRACT_ADDRESS);
    
    const provider = getReadProvider();
    const currentBlock = await provider.getBlockNumber();
    
    console.log('Current block:', currentBlock);
    
    // Determine scan range
    const scanFromBlock = Math.max(
      SCAN_CONFIG.START_BLOCK,
      currentBlock - SCAN_CONFIG.MAX_BLOCKS_TO_SCAN
    );
    
    console.log(`Scanning from block ${scanFromBlock} to ${currentBlock} (${currentBlock - scanFromBlock} blocks)`);
    
    // Scan in chunks to avoid RPC limits
    const allTransactions: ReferralTransaction[] = [];
    const chunkSize = SCAN_CONFIG.CHUNK_SIZE;
    
    for (let fromBlock = scanFromBlock; fromBlock <= currentBlock; fromBlock += chunkSize) {
      const toBlock = Math.min(fromBlock + chunkSize - 1, currentBlock);
      
      try {
        const chunkTransactions = await scanReferralTransfers(
          provider,
          userAddress,
          fromBlock,
          toBlock
        );
        allTransactions.push(...chunkTransactions);
        
        // Small delay to avoid overwhelming the RPC
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (chunkError) {
        console.error(`Failed to scan chunk ${fromBlock}-${toBlock}:`, chunkError);
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
      recentTransactions: allTransactions.slice(0, 10) // Last 10 transactions
    };
    
    console.log('=== REFERRAL ANALYSIS COMPLETE ===');
    console.log(`Total referrals found: ${totalReferrals}`);
    console.log(`Total earnings: $${totalEarnings.toFixed(2)} USDC`);
    console.log(`Recent transactions: ${stats.recentTransactions.length}`);
    
    // Cache the results
    resultsCache.set(cacheKey, {
      data: stats,
      timestamp: Date.now()
    });
    
    return stats;
    
  } catch (error) {
    console.error('=== REFERRAL ANALYSIS FAILED ===');
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
 * Clear caches (useful for manual refresh)
 */
export const clearReferralCache = (userAddress?: string) => {
  if (userAddress) {
    const cacheKey = `referrals_${userAddress.toLowerCase()}`;
    resultsCache.delete(cacheKey);
  } else {
    resultsCache.clear();
    blockTimestampCache.clear();
  }
};
