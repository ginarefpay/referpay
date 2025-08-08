
import { ethers } from 'ethers';
import { USDC_CONTRACT_ADDRESS, CONTRACT_ADDRESS } from './config';
import { getProvider } from './wallet';

export interface ReferralEarning {
  transactionHash: string;
  fromAddress: string;
  amount: number;
  timestamp: Date;
  blockNumber: number;
}

export interface EnhancedReferralStats {
  totalReferrals: number;
  totalEarnings: number;
  earningsHistory: ReferralEarning[];
  lastUpdated: Date;
}

const USDC_DECIMALS = 6;
const REFERRAL_REWARD_AMOUNT = 1; // 1 USDC per referral

export const analyzeReferralEarningsEnhanced = async (userAddress: string): Promise<EnhancedReferralStats> => {
  try {
    console.log('Analyzing enhanced referral earnings for:', userAddress);
    
    const provider = getProvider();
    
    // Get recent blocks to analyze (last 10,000 blocks for better coverage)
    const currentBlock = await provider.getBlockNumber();
    const fromBlock = Math.max(0, currentBlock - 10000);
    
    console.log(`Scanning blocks ${fromBlock} to ${currentBlock} for USDC transfers`);
    
    // Create filter for USDC transfers TO the user address FROM the main contract
    const transferFilter = {
      address: USDC_CONTRACT_ADDRESS,
      topics: [
        ethers.id("Transfer(address,address,uint256)"),
        ethers.zeroPadValue(CONTRACT_ADDRESS, 32), // from (main contract)
        ethers.zeroPadValue(userAddress, 32) // to (user address)
      ],
      fromBlock,
      toBlock: currentBlock
    };
    
    const logs = await provider.getLogs(transferFilter);
    console.log(`Found ${logs.length} USDC transfers from contract to user`);
    
    const earningsHistory: ReferralEarning[] = [];
    let totalEarnings = 0;
    
    // USDC Transfer event interface
    const usdcInterface = new ethers.Interface([
      "event Transfer(address indexed from, address indexed to, uint256 value)"
    ]);
    
    for (const log of logs) {
      try {
        const decoded = usdcInterface.parseLog(log);
        if (!decoded) continue;
        
        const amount = Number(ethers.formatUnits(decoded.args.value, USDC_DECIMALS));
        
        // Only count transfers that match the referral reward amount (1 USDC)
        // Allow for small precision differences (0.99 - 1.01 USDC)
        if (amount >= 0.99 && amount <= 1.01) {
          const block = await provider.getBlock(log.blockNumber);
          
          const earning: ReferralEarning = {
            transactionHash: log.transactionHash,
            fromAddress: decoded.args.from,
            amount,
            timestamp: new Date(block!.timestamp * 1000),
            blockNumber: log.blockNumber
          };
          
          earningsHistory.push(earning);
          totalEarnings += amount;
        }
      } catch (error) {
        console.error('Error parsing USDC transfer log:', error);
      }
    }
    
    // Sort by timestamp (newest first)
    earningsHistory.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    const stats: EnhancedReferralStats = {
      totalReferrals: earningsHistory.length,
      totalEarnings: Number(totalEarnings.toFixed(2)),
      earningsHistory,
      lastUpdated: new Date()
    };
    
    console.log('Enhanced referral stats analyzed:', stats);
    return stats;
    
  } catch (error) {
    console.error('Error analyzing enhanced referral earnings:', error);
    return {
      totalReferrals: 0,
      totalEarnings: 0,
      earningsHistory: [],
      lastUpdated: new Date()
    };
  }
};

// Get referral stats with blockchain verification
export const getVerifiedReferralStats = async (userAddress: string): Promise<EnhancedReferralStats> => {
  const stats = await analyzeReferralEarningsEnhanced(userAddress);
  
  // Additional verification: cross-check with contract events if needed
  // This could include analyzing Mint events to correlate referrals with new partnerships
  
  return stats;
};
