import React from 'react';
import { useDesktopConnection } from './useDesktopConnection';

export interface ConnectionIndicatorProps {
  /**
   * Custom class name for the indicator
   */
  className?: string;
  
  /**
   * Custom style for the indicator
   */
  style?: React.CSSProperties;
  
  /**
   * Options for the useDesktopConnection hook
   */
  connectionOptions?: Parameters<typeof useDesktopConnection>[0];
  
  /**
   * Whether to show a tooltip with connection status
   * @default true
   */
  showTooltip?: boolean;
  
  /**
   * Custom connected indicator component
   */
  connectedIndicator?: React.ReactNode;
  
  /**
   * Custom disconnected indicator component
   */
  disconnectedIndicator?: React.ReactNode;
  
  /**
   * Custom tooltip component
   */
  tooltipComponent?: React.ReactNode;
  
  /**
   * Callback for when the indicator is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>, isConnected: boolean) => void;
}

/**
 * A component that shows the connection status of KeepKey Desktop
 */
export function ConnectionIndicator({
  className = '',
  style,
  connectionOptions,
  showTooltip = true,
  connectedIndicator,
  disconnectedIndicator,
  tooltipComponent,
  onClick,
}: ConnectionIndicatorProps) {
  const { isConnected, launchDesktop } = useDesktopConnection(connectionOptions);
  
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event, isConnected);
    } else if (!isConnected) {
      // Default behavior: launch desktop when disconnected
      launchDesktop();
    }
  };
  
  // Default indicators
  const defaultConnectedIndicator = (
    <div className="kk-connection-indicator kk-connected">
      <div className="kk-indicator-dot" />
    </div>
  );
  
  const defaultDisconnectedIndicator = (
    <div className="kk-connection-indicator kk-disconnected">
      <div className="kk-indicator-dot" />
    </div>
  );
  
  // Default tooltip
  const defaultTooltip = (
    <div className="kk-tooltip">
      {isConnected 
        ? 'KeepKey Desktop Connected' 
        : 'KeepKey Desktop Disconnected - Click to Launch'}
    </div>
  );
  
  return (
    <div 
      className={`kk-connection-indicator-container ${className}`}
      style={style}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`KeepKey Desktop ${isConnected ? 'Connected' : 'Disconnected'}`}
    >
      {isConnected 
        ? (connectedIndicator || defaultConnectedIndicator)
        : (disconnectedIndicator || defaultDisconnectedIndicator)
      }
      
      {showTooltip && (tooltipComponent || defaultTooltip)}
    </div>
  );
} 