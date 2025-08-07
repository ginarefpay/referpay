
export interface ReferralData {
  id: string;
  walletAddress: string;
  referrerAddress: string;
  joinDate: string;
  mintTransactionHash: string;
  earned: number;
  status: 'pending' | 'confirmed' | 'paid';
}

export interface ReferralStats {
  totalReferrals: number;
  totalEarnings: number;
  pendingPayouts: number;
  activeReferrals: number;
}

// In-memory storage for referrals (will be replaced with backend later)
const referralStorage = new Map<string, ReferralData[]>();
const earningsStorage = new Map<string, number>();

export const trackReferral = (
  referrerAddress: string,
  referredAddress: string,
  transactionHash: string
): void => {
  if (!referrerAddress || referrerAddress === referredAddress) {
    return; // Skip invalid referrals
  }

  const referralId = `${referrerAddress}-${referredAddress}-${Date.now()}`;
  
  const referralData: ReferralData = {
    id: referralId,
    walletAddress: referredAddress,
    referrerAddress,
    joinDate: new Date().toISOString(),
    mintTransactionHash: transactionHash,
    earned: 1.0, // $1 per referral
    status: 'confirmed'
  };

  // Add to referrer's list
  const existingReferrals = referralStorage.get(referrerAddress) || [];
  existingReferrals.push(referralData);
  referralStorage.set(referrerAddress, existingReferrals);

  // Update earnings
  const currentEarnings = earningsStorage.get(referrerAddress) || 0;
  earningsStorage.set(referrerAddress, currentEarnings + 1.0);

  console.log('Referral tracked:', referralData);
};

export const getReferralsByUser = (userAddress: string): ReferralData[] => {
  return referralStorage.get(userAddress) || [];
};

export const getReferralStats = (userAddress: string): ReferralStats => {
  const referrals = getReferralsByUser(userAddress);
  const totalEarnings = earningsStorage.get(userAddress) || 0;
  
  return {
    totalReferrals: referrals.length,
    totalEarnings,
    pendingPayouts: referrals.filter(r => r.status === 'pending').length,
    activeReferrals: referrals.filter(r => r.status === 'confirmed').length
  };
};

export const getRecentReferrals = (userAddress: string, limit = 10): ReferralData[] => {
  const referrals = getReferralsByUser(userAddress);
  return referrals
    .sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
    .slice(0, limit);
};

// Mock some initial data for demonstration
export const initializeMockReferrals = (userAddress: string): void => {
  if (referralStorage.has(userAddress)) {
    return; // Already initialized
  }

  const mockReferrals: ReferralData[] = [
    {
      id: '1',
      walletAddress: '0x742d35Cc6635C0532925a3b8D6Ac0C0db5C4532e',
      referrerAddress: userAddress,
      joinDate: '2024-12-15T10:30:00Z',
      mintTransactionHash: '0xabc123...',
      earned: 1.0,
      status: 'confirmed'
    },
    {
      id: '2',
      walletAddress: '0x8ba1f109551bD432803012645Hac136c843D7e7A',
      referrerAddress: userAddress,
      joinDate: '2024-12-10T14:20:00Z',
      mintTransactionHash: '0xdef456...',
      earned: 1.0,
      status: 'confirmed'
    }
  ];

  referralStorage.set(userAddress, mockReferrals);
  earningsStorage.set(userAddress, mockReferrals.length * 1.0);
};
