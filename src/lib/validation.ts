import { ethers } from 'ethers';

// Input validation utilities
export const validateEthereumAddress = (address: string): boolean => {
  if (!address) return true; // Allow empty address (zero address will be used)
  try {
    return ethers.isAddress(address);
  } catch {
    return false;
  }
};

export const normalizeEthereumAddress = (address: string): string => {
  if (!address || address.trim() === '') return '';
  try {
    return ethers.getAddress(address.trim());
  } catch {
    return address.trim();
  }
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[^\w\s.-]/gi, '');
};

export const validateReferrerAddress = (address: string): { isValid: boolean; error?: string } => {
  if (!address || address.trim() === '') {
    return { isValid: true }; // Empty is valid (will use zero address)
  }

  const trimmed = address.trim();
  
  if (trimmed.length !== 42) {
    return { isValid: false, error: 'Address must be 42 characters long' };
  }

  if (!trimmed.startsWith('0x')) {
    return { isValid: false, error: 'Address must start with 0x' };
  }

  if (!validateEthereumAddress(trimmed)) {
    return { isValid: false, error: 'Invalid Ethereum address format' };
  }

  return { isValid: true };
};