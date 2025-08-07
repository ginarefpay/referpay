
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, USDC_CONTRACT_ADDRESS, CONTRACT_ABI, USDC_ABI } from './config';
import { getProvider } from './wallet';

// Constants for the frontend
export const FOUNDING_PARTNERS_TARGET = 100000;

export interface LiveContractInfo {
  totalSupply: number;
  remainingSupply: number;
  mintPrice: number;
  isPaused: boolean;
}

export const getLiveContractInfo = async (): Promise<LiveContractInfo> => {
  try {
    const provider = getProvider();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    
    console.log('Fetching live contract data...');
    
    // Only call functions we know exist - avoid MAX_SUPPLY entirely
    const [totalSupply, mintPrice, isPaused] = await Promise.all([
      contract.totalSupply(),
      contract.MINT_PRICE(),
      contract.paused()
    ]);
    
    const totalSupplyNum = Number(totalSupply);
    
    const info: LiveContractInfo = {
      totalSupply: totalSupplyNum,
      remainingSupply: Math.max(0, FOUNDING_PARTNERS_TARGET - totalSupplyNum),
      mintPrice: Number(mintPrice),
      isPaused: Boolean(isPaused)
    };
    
    console.log('Live contract data fetched:', info);
    return info;
  } catch (error) {
    console.error('Error fetching live contract info:', error);
    // Return safe defaults
    return {
      totalSupply: 0,
      remainingSupply: FOUNDING_PARTNERS_TARGET,
      mintPrice: 5000000,
      isPaused: false
    };
  }
};

export const isPartnerLive = async (userAddress: string): Promise<boolean> => {
  try {
    const provider = getProvider();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    
    const balance = await contract.balanceOf(userAddress);
    return Number(balance) > 0;
  } catch (error) {
    console.error('Error checking partner status:', error);
    return false;
  }
};
