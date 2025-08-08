
import { ethers } from 'ethers';
import { USDC_CONTRACT_ADDRESS, CONTRACT_ADDRESS } from './config';
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
    console.log('Looking for USDC transfers FROM contract:', CONTRACT_ADDRESS, 'TO user:', userAddress);
    
    const provider = getProvider();
    
    // Get recent blocks to analyze (last 1000 blocks for performance)
    const currentBlock = await provider.getBlockNumber();
    const fromBlock = Math.max(0, currentBlock - 1000);
    
    console.log(`Analyzing blocks ${fromBlock} to ${currentBlock}`);
    
    // Create filter for USDC transfers FROM the main contract TO the user address
    const transferFilter = {
      address: USDC_CONTRACT_ADDRESS,
      topics: [
        ethers.id("Transfer(address,address,uint256)"),
        ethers.zeroPadValue(CONTRACT_ADDRESS.toLowerCase(), 32), // from (main contract only)
        ethers.zeroPadValue(userAddress.toLowerCase(), 32) // to (user address)
      ],
      fromBlock,
      toBlock: currentBlock
    };
    
    const logs = await provider.getLogs(transferFilter);
    console.log(`Found ${logs.length} USDC transfers from contract to user`);
    
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
        
        // Get block timestamp
        const block = await provider.getBlock(log.blockNumber);
        
        transactions.push({
          hash: log.transactionHash,
          from: decoded.args.from,
          amount,
          timestamp: new Date(block!.timestamp * 1000)
        });
        
        totalEarnings += amount;
        
        console.log(`Found referral payment: $${amount} from ${decoded.args.from} on ${new Date(block!.timestamp * 1000).toLocaleDateString()}`);
      } catch (error) {
        console.error('Error parsing log:', error);
      }
    }
    
    // Total referrals = count of transfers from main contract to user
    // Each transfer represents one referral reward
    const stats: ReferralStats = {
      totalReferrals: transactions.length,
      totalEarnings,
      recentTransactions: transactions.slice(-10).reverse() // Last 10 transactions, most recent first
    };
    
    console.log('Final referral stats:', {
      totalReferrals: stats.totalReferrals,
      totalEarnings: stats.totalEarnings.toFixed(2),
      recentCount: stats.recentTransactions.length
    });
    
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
