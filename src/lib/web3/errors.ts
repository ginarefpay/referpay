
export class Web3Error extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'Web3Error';
  }
}

export class WalletConnectionError extends Web3Error {
  constructor(message: string, originalError?: Error) {
    super(message, 'WALLET_CONNECTION_ERROR', originalError);
  }
}

export class TransactionError extends Web3Error {
  constructor(message: string, originalError?: Error) {
    super(message, 'TRANSACTION_ERROR', originalError);
  }
}

export class ContractError extends Web3Error {
  constructor(message: string, originalError?: Error) {
    super(message, 'CONTRACT_ERROR', originalError);
  }
}

export const getErrorMessage = (error: any): string => {
  if (error instanceof Web3Error) {
    return error.message;
  }
  
  if (error?.reason) {
    return error.reason;
  }
  
  if (error?.message) {
    if (error.message.includes('user rejected')) {
      return 'Transaction was rejected by user';
    }
    if (error.message.includes('insufficient funds')) {
      return 'Insufficient funds for transaction';
    }
    return error.message;
  }
  
  return 'An unknown error occurred';
};
