import { useCallback, useEffect, useState } from 'react';

export interface UseDesktopConnectionOptions {
  /**
   * Polling interval in milliseconds
   * @default 15000
   */
  pollingInterval?: number;
  
  /**
   * Timeout for connection check in milliseconds
   * @default 2000
   */
  timeout?: number;
  
  /**
   * Endpoint to check for KeepKey Desktop
   * @default 'http://localhost:1646/docs'
   */
  endpoint?: string;
}

export interface UseDesktopConnectionResult {
  /**
   * Whether KeepKey Desktop is running
   */
  isConnected: boolean;
  
  /**
   * Check the connection status immediately
   */
  checkConnection: () => Promise<boolean>;
  
  /**
   * Launch KeepKey Desktop application
   */
  launchDesktop: () => void;
}

/**
 * Hook for checking the connection status of KeepKey Desktop
 */
export function useDesktopConnection(options: UseDesktopConnectionOptions = {}): UseDesktopConnectionResult {
  const {
    pollingInterval = 15000,
    timeout = 2000,
    endpoint = 'http://localhost:1646/docs'
  } = options;
  
  const [isConnected, setIsConnected] = useState(false);
  
  const checkConnection = useCallback(async (): Promise<boolean> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(endpoint, { 
        signal: controller.signal 
      });
      
      clearTimeout(timeoutId);
      const connected = response.status === 200;
      setIsConnected(connected);
      return connected;
    } catch {
      setIsConnected(false);
      return false;
    }
  }, [endpoint, timeout]);
  
  const launchDesktop = useCallback(() => {
    try {
      window.location.assign('keepkey://launch');
      return true;
    } catch (error) {
      console.error('Failed to launch KeepKey Desktop:', error);
      return false;
    }
  }, []);
  
  useEffect(() => {
    // Check immediately
    checkConnection();
    
    // Set up polling
    const interval = setInterval(checkConnection, pollingInterval);
    
    // Clean up
    return () => clearInterval(interval);
  }, [checkConnection, pollingInterval]);
  
  return {
    isConnected,
    checkConnection,
    launchDesktop
  };
} 