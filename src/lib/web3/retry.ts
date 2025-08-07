
import { Web3Error } from './errors';

interface RetryOptions {
  maxAttempts: number;
  delay: number;
  backoff?: boolean;
}

export const withRetry = async <T>(
  fn: () => Promise<T>,
  options: RetryOptions = { maxAttempts: 3, delay: 1000 }
): Promise<T> => {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry user rejections
      if (error instanceof Error && error.message.includes('user rejected')) {
        throw error;
      }
      
      if (attempt === options.maxAttempts) {
        throw lastError;
      }
      
      const delay = options.backoff ? options.delay * attempt : options.delay;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
};
