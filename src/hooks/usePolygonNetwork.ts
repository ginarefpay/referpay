
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { checkNetwork, switchToPolygon, promptNetworkSwitch } from '@/lib/web3/network';

export const usePolygonNetwork = () => {
  const [isPolygonNetwork, setIsPolygonNetwork] = useState(false);
  const [isCheckingNetwork, setIsCheckingNetwork] = useState(true);
  const { toast } = useToast();

  const checkCurrentNetwork = useCallback(async () => {
    try {
      setIsCheckingNetwork(true);
      const isPolygon = await checkNetwork();
      setIsPolygonNetwork(isPolygon);
      
      if (!isPolygon) {
        toast({
          title: "Wrong Network",
          description: "Please switch to Polygon network to continue",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Network check failed:', error);
      setIsPolygonNetwork(false);
    } finally {
      setIsCheckingNetwork(false);
    }
  }, [toast]);

  const handleSwitchToPolygon = useCallback(async () => {
    try {
      const success = await switchToPolygon();
      if (success) {
        setIsPolygonNetwork(true);
        toast({
          title: "Network Switched",
          description: "Successfully switched to Polygon network",
        });
      } else {
        toast({
          title: "Network Switch Failed",
          description: "Failed to switch to Polygon network",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Error switching to Polygon network",
        variant: "destructive",
      });
    }
  }, [toast]);

  const ensurePolygonNetwork = useCallback(async (): Promise<boolean> => {
    try {
      await promptNetworkSwitch();
      await checkCurrentNetwork();
      return true;
    } catch (error) {
      toast({
        title: "Network Required",
        description: "Polygon network is required for this operation",
        variant: "destructive",
      });
      return false;
    }
  }, [checkCurrentNetwork, toast]);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      checkCurrentNetwork();
      
      // Listen for network changes
      const handleChainChanged = () => {
        checkCurrentNetwork();
      };
      
      window.ethereum.on('chainChanged', handleChainChanged);
      
      return () => {
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [checkCurrentNetwork]);

  return {
    isPolygonNetwork,
    isCheckingNetwork,
    checkCurrentNetwork,
    handleSwitchToPolygon,
    ensurePolygonNetwork
  };
};
