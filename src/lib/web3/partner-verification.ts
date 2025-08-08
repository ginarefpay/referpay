
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config';
import { getProvider } from './wallet';

export interface PartnerVerification {
  isPartner: boolean;
  nftBalance: number;
  partnershipDate?: Date;
  deedTokenId?: number;
}

export const verifyPartnershipStatus = async (userAddress: string): Promise<PartnerVerification> => {
  try {
    const provider = getProvider();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    
    console.log('Verifying partnership status for:', userAddress);
    
    // Check NFT balance
    const balance = await contract.balanceOf(userAddress);
    const nftBalance = Number(balance);
    const isPartner = nftBalance > 0;
    
    let partnershipDate: Date | undefined;
    let deedTokenId: number | undefined;
    
    if (isPartner) {
      try {
        // Get the first token owned by this user
        const tokenId = await contract.tokenOfOwnerByIndex(userAddress, 0);
        deedTokenId = Number(tokenId);
        
        // Try to get mint timestamp from token URI or other means
        // This would require additional contract methods or event filtering
        // For now, we'll use a placeholder
        partnershipDate = new Date(); // This should be replaced with actual mint date
        
      } catch (error) {
        console.warn('Could not fetch detailed partnership data:', error);
      }
    }
    
    const verification: PartnerVerification = {
      isPartner,
      nftBalance,
      partnershipDate,
      deedTokenId
    };
    
    console.log('Partnership verification result:', verification);
    return verification;
    
  } catch (error) {
    console.error('Error verifying partnership status:', error);
    return {
      isPartner: false,
      nftBalance: 0
    };
  }
};
