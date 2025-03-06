# @keepkey/connection-indicator

A React component for displaying the connection status of KeepKey Desktop.

## Features

- Real-time status monitoring of KeepKey Desktop
- Customizable appearance
- Automatic polling
- Launch KeepKey Desktop functionality

## Installation

```bash
npm install @keepkey/connection-indicator
# or
yarn add @keepkey/connection-indicator
# or
pnpm add @keepkey/connection-indicator
```

## Usage

### Basic Usage

```tsx
import { ConnectionIndicator } from '@keepkey/connection-indicator';

function App() {
  return (
    <div>
      <h1>My KeepKey App</h1>
      <ConnectionIndicator />
    </div>
  );
}
```

### With Custom Options

```tsx
import { ConnectionIndicator } from '@keepkey/connection-indicator';

function App() {
  return (
    <div>
      <h1>My KeepKey App</h1>
      <ConnectionIndicator 
        connectionOptions={{
          pollingInterval: 5000, // Check every 5 seconds
          timeout: 1000, // 1 second timeout
        }}
        showTooltip={true}
        onClick={(e, isConnected) => {
          if (!isConnected) {
            console.log('Launching KeepKey Desktop...');
          }
        }}
      />
    </div>
  );
}
```

### Using the Hook Directly

```tsx
import { useDesktopConnection } from '@keepkey/connection-indicator';

function CustomIndicator() {
  const { isConnected, checkConnection, launchDesktop } = useDesktopConnection();
  
  return (
    <button 
      style={{ 
        backgroundColor: isConnected ? 'green' : 'red',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '4px'
      }}
      onClick={() => !isConnected && launchDesktop()}
    >
      {isConnected ? 'Connected to KeepKey' : 'Launch KeepKey Desktop'}
    </button>
  );
}
```

## API

### ConnectionIndicator Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | '' | Custom class name for the indicator |
| style | CSSProperties | undefined | Custom style for the indicator |
| connectionOptions | UseDesktopConnectionOptions | {} | Options for the useDesktopConnection hook |
| showTooltip | boolean | true | Whether to show a tooltip with connection status |
| connectedIndicator | ReactNode | undefined | Custom connected indicator component |
| disconnectedIndicator | ReactNode | undefined | Custom disconnected indicator component |
| tooltipComponent | ReactNode | undefined | Custom tooltip component |
| onClick | function | undefined | Callback for when the indicator is clicked |

### UseDesktopConnectionOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| pollingInterval | number | 15000 | Polling interval in milliseconds |
| timeout | number | 2000 | Timeout for connection check in milliseconds |
| endpoint | string | 'http://localhost:1646/docs' | Endpoint to check for KeepKey Desktop |

## License

MIT 