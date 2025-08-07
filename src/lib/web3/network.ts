
import { ethers } from 'ethers';
import { getProvider } from './wallet';

export const POLYGON_NETWORK_ID = 137;
export const POLYGON_TESTNET_ID = 80001;

export const POLYGON_NETWORK_CONFIG = {
  chainId: '0x89', // 137 in hex
  chainName: 'Polygon Mainnet',
  nativeCurrency: {
    name: 'POL',
    symbol: 'POL',
    decimals: 18
  },
  rpcUrls: ['https://polygon-rpc.com/'],
  blockExplorerUrls: ['https://polygonscan.com/']
};

export const checkNetwork = async (): Promise<boolean> => {
  try {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask not installed');
    }

    const provider = getProvider();
    const network = await provider.getNetwork();
    const chainId = Number(network.chainId);
    
    console.log('Current network:', chainId);
    return chainId === POLYGON_NETWORK_ID;
  } catch (error) {
    console.error('Error checking network:', error);
    return false;
  }
};

export const switchToPolygon = async (): Promise<boolean> => {
  try {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask not installed');
    }

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: POLYGON_NETWORK_CONFIG.chainId }],
    });

    return true;
  } catch (error: any) {
    console.error('Error switching network:', error);
    
    // If network doesn't exist, add it
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [POLYGON_NETWORK_CONFIG],
        });
        return true;
      } catch (addError) {
        console.error('Error adding network:', addError);
        return false;
      }
    }
    
    return false;
  }
};

export const promptNetworkSwitch = async (): Promise<boolean> => {
  const isPolygon = await checkNetwork();
  
  if (!isPolygon) {
    const switched = await switchToPolygon();
    if (!switched) {
      throw new Error('Please switch to Polygon network to continue');
    }
  }
  
  return true;
};
