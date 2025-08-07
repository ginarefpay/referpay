
import { getUserNFTBalance } from './contracts';
import { getEnhancedUserData } from './enhanced-contracts';

/**
 * Check if a user is a partner (has minted at least one NFT)
 */
export const isPartner = async (userAddress: string): Promise<boolean> => {
  try {
    const userData = await getEnhancedUserData(userAddress);
    return userData.mintCount > 0;
  } catch (error) {
    console.error('Error checking partner status:', error);
    return false;
  }
};

/**
 * Check partner status using NFT balance (alternative method)
 */
export const isPartnerByBalance = async (userAddress: string): Promise<boolean> => {
  try {
    const balance = await getUserNFTBalance(userAddress);
    return balance > 0;
  } catch (error) {
    console.error('Error checking partner status by balance:', error);
    return false;
  }
};
