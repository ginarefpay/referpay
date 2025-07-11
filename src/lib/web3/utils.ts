// Utility functions for referral links and URL parsing
export const generateReferralLink = (userAddress: string): string => {
  return `https://referpay.org/?ref=${userAddress}`;
};

export const getReferrerFromURL = (): string => {
  const params = new URLSearchParams(window.location.search);
  return params.get('ref') || '';
};