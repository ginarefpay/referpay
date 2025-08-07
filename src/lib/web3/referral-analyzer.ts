
import { ethers } from 'ethers';
import { USDC_CONTRACT_ADDRESS } from './config';
import { getProvider } from './wallet';

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

export const analyzeReferralEarnings = async (userAddress: string): Promise<ReferralStats> => {
  try {
    console.log('Analyzing referral earnings for:', userAddress);
    
    const provider = getProvider();
    
    // Get recent blocks to analyze (last 1000 blocks as example)
    const currentBlock = await provider.getBlockNumber();
    const fromBlock = Math.max(0, currentBlock - 1000);
    
    // Create filter for USDC transfers TO the user address
    const transferFilter = {
      address: USDC_CONTRACT_ADDRESS,
      topics: [
        ethers.id("Transfer(address,address,uint256)"),
        null, // from (any address)
        ethers.zeroPadValue(userAddress, 32) // to (user address)
      ],
      fromBlock,
      toBlock: currentBlock
    };
    
    const logs = await provider.getLogs(transferFilter);
    console.log(`Found ${logs.length} USDC transfers to user`);
    
    const transactions: ReferralTransaction[] = [];
    let totalEarnings = 0;
    
    for (const log of logs) {
      try {
        // Decode the transfer event
        const iface = new ethers.Interface([
          "event Transfer(address indexed from, address indexed to, uint256 value)"
        ]);
        
        const decoded = iface.parseLog(log);
        if (!decoded) continue;
        
        const amount = Number(ethers.formatUnits(decoded.args.value, 6)); // USDC has 6 decimals
        
        // Only count transfers that look like referral rewards (typically $1)
        if (amount >= 0.9 && amount <= 1.1) {
          const block = await provider.getBlock(log.blockNumber);
          
          transactions.push({
            hash: log.transactionHash,
            from: decoded.args.from,
            amount,
            timestamp: new Date(block!.timestamp * 1000)
          });
          
          totalEarnings += amount;
        }
      } catch (error) {
        console.error('Error parsing log:', error);
      }
    }
    
    const stats: ReferralStats = {
      totalReferrals: transactions.length,
      totalEarnings,
      recentTransactions: transactions.slice(-10) // Last 10 transactions
    };
    
    console.log('Referral stats analyzed:', stats);
    return stats;
  } catch (error) {
    console.error('Error analyzing referral earnings:', error);
    return {
      totalReferrals: 0,
      totalEarnings: 0,
      recentTransactions: []
    };
  }
};
