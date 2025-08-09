
import { ethers } from 'ethers';

// Wallet connection functionality
export const connectWallet = async (): Promise<string | null> => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      return accounts[0];
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      return null;
    }
  } else {
    alert('Please install MetaMask to continue');
    return null;
  }
};

export const getProvider = () => {
  if (typeof window.ethereum !== 'undefined') {
    return new ethers.BrowserProvider(window.ethereum);
  }
  throw new Error('No ethereum provider found');
};

// Create a reliable read-only provider for blockchain queries
export const getReadProvider = () => {
  // Use Polygon mainnet RPC endpoints
  const rpcUrls = [
    'https://polygon-rpc.com',
    'https://rpc-mainnet.matic.network',
    'https://matic-mainnet.chainstacklabs.com'
  ];
  
  // Try each RPC until one works
  for (const rpcUrl of rpcUrls) {
    try {
      return new ethers.JsonRpcProvider(rpcUrl);
    } catch (error) {
      console.warn(`Failed to connect to ${rpcUrl}:`, error);
      continue;
    }
  }
  
  // Fallback to browser provider if available
  if (typeof window.ethereum !== 'undefined') {
    return new ethers.BrowserProvider(window.ethereum);
  }
  
  throw new Error('No reliable provider available');
};
