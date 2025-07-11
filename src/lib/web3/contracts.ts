import { ethers } from 'ethers';
import { 
  CONTRACT_ADDRESS, 
  USDC_CONTRACT_ADDRESS, 
  MINT_PRICE, 
  CONTRACT_ABI, 
  USDC_ABI 
} from './config';
import { getProvider } from './wallet';

// Contract interaction functions
export const approveUSDC = async (userAddress: string) => {
  const provider = getProvider();
  const signer = await provider.getSigner();
  const usdcContract = new ethers.Contract(USDC_CONTRACT_ADDRESS, USDC_ABI, signer);
  
  const tx = await usdcContract.approve(CONTRACT_ADDRESS, MINT_PRICE);
  await tx.wait();
  return tx;
};

export const mintNFT = async (referrerAddress: string) => {
  const provider = getProvider();
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  
  const tx = await contract.mint(referrerAddress);
  await tx.wait();
  return tx;
};

export const checkMintStatus = async (userAddress: string): Promise<number> => {
  const provider = getProvider();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  
  const mintCount = await contract.walletMints(userAddress);
  return Number(mintCount);
};

export const getContractInfo = async () => {
  const provider = getProvider();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  
  try {
    const [maxSupply, totalSupply, mintPrice, isPaused] = await Promise.all([
      contract.MAX_SUPPLY(),
      contract.totalSupply(),
      contract.MINT_PRICE(),
      contract.paused()
    ]);
    
    return {
      maxSupply: Number(maxSupply),
      totalSupply: Number(totalSupply),
      remainingSupply: Number(maxSupply) - Number(totalSupply),
      mintPrice: Number(mintPrice),
      isPaused: Boolean(isPaused)
    };
  } catch (error) {
    console.error('Error fetching contract info:', error);
    return {
      maxSupply: 100000,
      totalSupply: 0,
      remainingSupply: 100000,
      mintPrice: 5000000,
      isPaused: false
    };
  }
};

export const getUserNFTBalance = async (userAddress: string): Promise<number> => {
  try {
    const provider = getProvider();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    
    const balance = await contract.balanceOf(userAddress);
    return Number(balance);
  } catch (error) {
    console.error('Error fetching NFT balance:', error);
    return 0;
  }
};

export const getTokenURI = async (tokenId: number): Promise<string> => {
  try {
    const provider = getProvider();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    
    const uri = await contract.tokenURI(tokenId);
    return uri;
  } catch (error) {
    console.error('Error fetching token URI:', error);
    return '';
  }
};

export const getRoyaltyInfo = async (tokenId: number, salePrice: number) => {
  try {
    const provider = getProvider();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    
    const [receiver, royaltyAmount] = await contract.royaltyInfo(tokenId, salePrice);
    return {
      receiver,
      royaltyAmount: Number(royaltyAmount),
      royaltyPercent: (Number(royaltyAmount) / salePrice) * 100
    };
  } catch (error) {
    console.error('Error fetching royalty info:', error);
    return {
      receiver: '',
      royaltyAmount: 0,
      royaltyPercent: 0
    };
  }
};