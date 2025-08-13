
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { connectWallet } from '@/lib/web3/wallet';
import { getErrorMessage } from '@/lib/web3/errors';

export const useUserWallet = () => {
  const [connectedWallet, setConnectedWallet] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = useCallback(async () => {
    setIsConnecting(true);
    try {
      console.log('🔌 Connecting wallet...');
      const address = await connectWallet();
      
      if (address) {
        setConnectedWallet(address);
        console.log('✅ Wallet connected:', address);
        
        toast({
          title: "Wallet Connected",
          description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
        });
      }
    } catch (error) {
      console.error('❌ Wallet connection failed:', error);
      toast({
        title: "Connection Failed",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  }, [toast]);

  const disconnect = useCallback(() => {
    setConnectedWallet('');
    console.log('🔌 Wallet disconnected');
  }, []);

  return {
    connectedWallet,
    isConnecting,
    isConnected: !!connectedWallet,
    connect: handleConnect,
    disconnect
  };
};
