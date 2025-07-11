import { ethers } from 'ethers';

// Contract Configuration
export const CONTRACT_ADDRESS = '0xbDa66426438FEFC0509c08a34F693d69474916Ab';
export const USDC_CONTRACT_ADDRESS = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'; // Sepolia Testnet USDC
export const MINT_PRICE = '5000000'; // 5 USDC (6 decimals)

export const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_referrer",
        "type": "address"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_SUPPLY",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MINT_PRICE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "walletMints",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "salePrice",
        "type": "uint256"
      }
    ],
    "name": "royaltyInfo",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export const USDC_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Web3 Helper Functions
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

export const generateReferralLink = (userAddress: string): string => {
  return `https://referpay.org/?ref=${userAddress}`;
};

export const getReferrerFromURL = (): string => {
  const params = new URLSearchParams(window.location.search);
  return params.get('ref') || '';
};

// Type declarations for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}