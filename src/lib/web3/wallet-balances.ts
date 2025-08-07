
import { ethers } from 'ethers';
import { USDC_CONTRACT_ADDRESS, USDC_ABI } from './config';
import { getProvider } from './wallet';

export interface WalletBalances {
  pol: number;
  usdc: number;
}

export const getWalletBalances = async (userAddress: string): Promise<WalletBalances> => {
  try {
    const provider = getProvider();
    
    console.log('Fetching wallet balances for:', userAddress);
    
    // Get POL balance (native token)
    const polBalanceWei = await provider.getBalance(userAddress);
    const polBalance = Number(ethers.formatEther(polBalanceWei));
    
    // Get USDC balance
    const usdcContract = new ethers.Contract(USDC_CONTRACT_ADDRESS, USDC_ABI, provider);
    const usdcBalanceRaw = await usdcContract.balanceOf(userAddress);
    const usdcBalance = Number(ethers.formatUnits(usdcBalanceRaw, 6)); // USDC has 6 decimals
    
    const balances = {
      pol: polBalance,
      usdc: usdcBalance
    };
    
    console.log('Wallet balances fetched:', balances);
    return balances;
  } catch (error) {
    console.error('Error fetching wallet balances:', error);
    return { pol: 0, usdc: 0 };
  }
};
