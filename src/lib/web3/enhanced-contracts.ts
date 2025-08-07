
import { ethers } from 'ethers';
import { 
  CONTRACT_ADDRESS, 
  USDC_CONTRACT_ADDRESS, 
  MINT_PRICE, 
  CONTRACT_ABI, 
  USDC_ABI 
} from './config';
import { getProvider } from './wallet';
import { executeTransaction, TransactionResult } from './transaction';
import { ContractError, getErrorMessage } from './errors';
import { withRetry } from './retry';

export interface ContractInfo {
  maxSupply: number;
  totalSupply: number;
  remainingSupply: number;
  mintPrice: number;
  isPaused: boolean;
}

export interface UserData {
  nftBalance: number;
  mintCount: number;
  referralCount: number;
  totalEarnings: number;
}

export const getEnhancedContractInfo = async (): Promise<ContractInfo> => {
  try {
    const provider = getProvider();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    
    console.log('Fetching contract info...');
    
    const [maxSupply, totalSupply, mintPrice, isPaused] = await withRetry(async () => {
      return Promise.all([
        contract.MAX_SUPPLY(),
        contract.totalSupply(),
        contract.MINT_PRICE(),
        contract.paused()
      ]);
    });
    
    const info = {
      maxSupply: Number(maxSupply),
      totalSupply: Number(totalSupply),
      remainingSupply: Number(maxSupply) - Number(totalSupply),
      mintPrice: Number(mintPrice),
      isPaused: Boolean(isPaused)
    };
    
    console.log('Contract info fetched:', info);
    return info;
  } catch (error) {
    console.error('Error fetching contract info:', error);
    throw new ContractError(getErrorMessage(error), error as Error);
  }
};

export const getEnhancedUserData = async (userAddress: string): Promise<UserData> => {
  try {
    const provider = getProvider();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    
    console.log('Fetching user data for:', userAddress);
    
    const [nftBalance, mintCount] = await withRetry(async () => {
      return Promise.all([
        contract.balanceOf(userAddress),
        contract.walletMints(userAddress)
      ]);
    });
    
    // For now, we'll calculate referrals and earnings based on mint count
    // This will be replaced with actual referral tracking
    const referralCount = Math.floor(Number(mintCount) * 1.5); // Mock calculation
    const totalEarnings = referralCount * 1.0; // $1 per referral
    
    const userData = {
      nftBalance: Number(nftBalance),
      mintCount: Number(mintCount),
      referralCount,
      totalEarnings
    };
    
    console.log('User data fetched:', userData);
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new ContractError(getErrorMessage(error), error as Error);
  }
};

export const enhancedApproveUSDC = async (userAddress: string): Promise<TransactionResult> => {
  try {
    const provider = getProvider();
    const signer = await provider.getSigner();
    const usdcContract = new ethers.Contract(USDC_CONTRACT_ADDRESS, USDC_ABI, signer);
    
    console.log('Approving USDC spending...');
    
    return executeTransaction(
      () => usdcContract.approve(CONTRACT_ADDRESS, MINT_PRICE)
    );
  } catch (error) {
    console.error('USDC approval failed:', error);
    throw new ContractError(getErrorMessage(error), error as Error);
  }
};

export const enhancedMintNFT = async (referrerAddress: string): Promise<TransactionResult> => {
  try {
    const provider = getProvider();
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    
    console.log('Minting NFT with referrer:', referrerAddress);
    
    return executeTransaction(
      () => contract.mint(referrerAddress || ethers.ZeroAddress)
    );
  } catch (error) {
    console.error('NFT minting failed:', error);
    throw new ContractError(getErrorMessage(error), error as Error);
  }
};

export const checkUSDCAllowance = async (userAddress: string): Promise<number> => {
  try {
    const provider = getProvider();
    const usdcContract = new ethers.Contract(USDC_CONTRACT_ADDRESS, USDC_ABI, provider);
    
    const allowance = await usdcContract.allowance(userAddress, CONTRACT_ADDRESS);
    return Number(allowance);
  } catch (error) {
    console.error('Error checking USDC allowance:', error);
    return 0;
  }
};
