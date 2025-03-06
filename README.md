# KeepKey Template Monorepo

This monorepo contains a collection of packages for building applications with KeepKey hardware wallets. It includes templates, reusable components, and tools to help developers get started quickly.

## Packages

### @keepkey/template

A starter template for building applications on top of the KeepKey hardware wallet. It provides a foundation for creating secure, user-friendly interfaces that interact with the KeepKey device.

- Next.js 15+ with App Router
- TypeScript
- Chakra UI components
- Pioneer SDK integration
- Multi-chain support

### @keepkey/connection-indicator

A React component for displaying the connection status of KeepKey Desktop. The component provides real-time monitoring and easy integration with any React application.

- Real-time status monitoring
- Customizable appearance
- Automatic polling
- Launch KeepKey Desktop functionality

### create-keepkey-app

A command-line interface for creating new KeepKey applications. It provides templates and configuration options to get developers started quickly.

```bash
# Using npx (recommended)
npx create-keepkey-app my-app

# Specify a template
npx create-keepkey-app my-app --template full
```

## Development

### Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run development server for the template
pnpm dev
```

### Working on individual packages

```bash
# Build a specific package
pnpm --filter=@keepkey/connection-indicator build

# Run development server for the template app
pnpm --filter=@keepkey/template dev

# Build the CLI
pnpm --filter=create-keepkey-app build
```

## Package Usage

### Using the Connection Indicator

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

### Creating a new app

```bash
# Create a new app with the default template
npx create-keepkey-app my-app

# Full-featured template with all components
npx create-keepkey-app my-app --template full

# Customize the configuration
npx create-keepkey-app my-app --use-pnpm --no-connection-indicator
```

## Documentation

- [Template Documentation](./packages/template/README.md)
- [Connection Indicator](./packages/connection-indicator/README.md)
- [CLI Tool Documentation](./packages/create-keepkey-cli/README.md)

## License

MIT
