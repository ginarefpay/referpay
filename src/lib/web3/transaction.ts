
import { ethers } from 'ethers';
import { getProvider } from './wallet';
import { TransactionError, getErrorMessage } from './errors';
import { withRetry } from './retry';

interface TransactionOptions {
  gasLimit?: string;
  gasPrice?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
}

export interface TransactionResult {
  hash: string;
  blockNumber?: number;
  gasUsed?: string;
  status: 'pending' | 'confirmed' | 'failed';
}

export const executeTransaction = async (
  contractFunction: () => Promise<ethers.ContractTransactionResponse>,
  options?: TransactionOptions
): Promise<TransactionResult> => {
  try {
    console.log('Executing transaction with options:', options);
    
    const tx = await withRetry(contractFunction, { maxAttempts: 2, delay: 1000 });
    
    console.log('Transaction submitted:', tx.hash);
    
    // Wait for confirmation
    const receipt = await tx.wait();
    
    if (!receipt) {
      throw new TransactionError('Transaction receipt not available');
    }
    
    console.log('Transaction confirmed:', receipt);
    
    return {
      hash: tx.hash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed?.toString(),
      status: receipt.status === 1 ? 'confirmed' : 'failed'
    };
  } catch (error) {
    console.error('Transaction failed:', error);
    throw new TransactionError(getErrorMessage(error), error as Error);
  }
};

export const estimateGas = async (
  contractFunction: () => Promise<ethers.ContractTransactionResponse>
): Promise<string> => {
  try {
    const provider = getProvider();
    const estimatedGas = await contractFunction();
    return estimatedGas.gasLimit?.toString() || '0';
  } catch (error) {
    console.error('Gas estimation failed:', error);
    return '0';
  }
};
