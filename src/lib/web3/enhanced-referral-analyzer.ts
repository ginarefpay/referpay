
import { ethers } from 'ethers';
import { USDC_CONTRACT_ADDRESS, CONTRACT_ADDRESS } from './config';
import { getProvider } from './wallet';

export interface ReferralEarning {
  transactionHash: string;
  fromAddress: string;
  toAddress: string;
  amount: number;
  timestamp: Date;
  blockNumber: number;
  verified: boolean;
}

export interface EnhancedReferralStats {
  totalReferrals: number;
  totalEarnings: number;
  earningsHistory: ReferralEarning[];
  lastUpdated: Date;
  verificationMethod: 'blockchain_analysis';
}

const USDC_DECIMALS = 6;
const EXACT_REFERRAL_AMOUNT = 1000000; // 1 USDC in smallest unit (1,000,000 units with 6 decimals)

export const analyzeReferralEarningsEnhanced = async (userAddress: string): Promise<EnhancedReferralStats> => {
  try {
    console.log('🔍 Analyzing referral earnings for:', userAddress);
    console.log('📄 Contract Address:', CONTRACT_ADDRESS);
    console.log('💰 USDC Contract:', USDC_CONTRACT_ADDRESS);
    
    const provider = getProvider();
    
    // Get recent blocks for comprehensive analysis
    const currentBlock = await provider.getBlockNumber();
    const fromBlock = Math.max(0, currentBlock - 50000); // Analyze last 50k blocks for better coverage
    
    console.log(`📊 Scanning blocks ${fromBlock} to ${currentBlock} for USDC transfers`);
    
    // Create precise filter for USDC Transfer events
    // Only count transfers FROM the main contract TO the user's address
    const transferFilter = {
      address: USDC_CONTRACT_ADDRESS,
      topics: [
        ethers.id("Transfer(address,address,uint256)"), // Transfer event signature
        ethers.zeroPadValue(CONTRACT_ADDRESS.toLowerCase(), 32), // from: main contract
        ethers.zeroPadValue(userAddress.toLowerCase(), 32) // to: user address
      ],
      fromBlock,
      toBlock: currentBlock
    };
    
    const logs = await provider.getLogs(transferFilter);
    console.log(`📝 Found ${logs.length} USDC transfers from contract to user`);
    
    const earningsHistory: ReferralEarning[] = [];
    let totalEarnings = 0;
    
    // USDC Transfer event ABI
    const usdcInterface = new ethers.Interface([
      "event Transfer(address indexed from, address indexed to, uint256 value)"
    ]);
    
    // Process each transfer log
    for (const log of logs) {
      try {
        const decoded = usdcInterface.parseLog(log);
        if (!decoded) {
          console.warn('⚠️ Failed to decode log:', log.transactionHash);
          continue;
        }
        
        const rawAmount = decoded.args.value;
        const amount = Number(ethers.formatUnits(rawAmount, USDC_DECIMALS));
        
        console.log(`💸 Transfer found: ${amount} USDC from ${decoded.args.from} to ${decoded.args.to}`);
        
        // CRITICAL: Only count transfers of exactly 1.000000 USDC
        // This is the exact referral reward amount
        if (rawAmount.toString() === EXACT_REFERRAL_AMOUNT.toString()) {
          const block = await provider.getBlock(log.blockNumber);
          
          if (!block) {
            console.warn('⚠️ Block not found:', log.blockNumber);
            continue;
          }
          
          const earning: ReferralEarning = {
            transactionHash: log.transactionHash,
            fromAddress: decoded.args.from.toLowerCase(),
            toAddress: decoded.args.to.toLowerCase(),
            amount,
            timestamp: new Date(block.timestamp * 1000),
            blockNumber: log.blockNumber,
            verified: true // This is blockchain-verified data
          };
          
          earningsHistory.push(earning);
          totalEarnings += amount;
          
          console.log(`✅ Verified referral earning: $${amount} USDC at block ${log.blockNumber}`);
        } else {
          console.log(`❌ Amount mismatch: Expected exactly 1.000000 USDC, got ${amount} USDC`);
        }
      } catch (error) {
        console.error('❌ Error processing transfer log:', error);
      }
    }
    
    // Sort by timestamp (newest first)
    earningsHistory.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    const stats: EnhancedReferralStats = {
      totalReferrals: earningsHistory.length,
      totalEarnings: Number(totalEarnings.toFixed(6)), // Maintain precision
      earningsHistory,
      lastUpdated: new Date(),
      verificationMethod: 'blockchain_analysis'
    };
    
    console.log('📊 Final referral analysis:', {
      totalReferrals: stats.totalReferrals,
      totalEarnings: stats.totalEarnings,
      verificationsFound: earningsHistory.length,
      method: stats.verificationMethod
    });
    
    return stats;
    
  } catch (error) {
    console.error('❌ Error in enhanced referral analysis:', error);
    return {
      totalReferrals: 0,
      totalEarnings: 0,
      earningsHistory: [],
      lastUpdated: new Date(),
      verificationMethod: 'blockchain_analysis'
    };
  }
};

// Additional verification function
export const verifyReferralEarning = async (transactionHash: string): Promise<boolean> => {
  try {
    const provider = getProvider();
    const receipt = await provider.getTransactionReceipt(transactionHash);
    
    if (!receipt) return false;
    
    // Check for Transfer events in the transaction
    const usdcInterface = new ethers.Interface([
      "event Transfer(address indexed from, address indexed to, uint256 value)"
    ]);
    
    for (const log of receipt.logs) {
      if (log.address.toLowerCase() === USDC_CONTRACT_ADDRESS.toLowerCase()) {
        try {
          const decoded = usdcInterface.parseLog(log);
          if (decoded && decoded.args.value.toString() === EXACT_REFERRAL_AMOUNT.toString()) {
            return true;
          }
        } catch (error) {
          // Ignore decoding errors
        }
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error verifying referral earning:', error);
    return false;
  }
};
