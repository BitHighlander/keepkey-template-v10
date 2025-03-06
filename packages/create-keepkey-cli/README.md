# create-keepkey-app

A command-line interface for creating KeepKey applications with pre-configured templates.

## Features

- 🚀 Quick project setup with KeepKey integrations
- 🔌 Optional connection indicator for KeepKey Desktop
- 📦 Multiple template options (basic, full)
- 🎨 Chakra UI styling and components
- 🛠️ Fully configured TypeScript setup
- 🧩 Modular structure using KeepKey packages

## Usage

```bash
# Using npx (recommended)
npx create-keepkey-app my-app

# Global installation
npm install -g create-keepkey-app
create-keepkey-app my-app

# Using package managers directly
npm create keepkey-app my-app
yarn create keepkey-app my-app
pnpm create keepkey-app my-app
```

## Options

```bash
# Display help
npx create-keepkey-app --help

# Specify a template
npx create-keepkey-app my-app --template full

# Skip dependency installation
npx create-keepkey-app my-app --skip-install

# Use a specific package manager
npx create-keepkey-app my-app --use-npm
npx create-keepkey-app my-app --use-yarn
npx create-keepkey-app my-app --use-pnpm

# Disable connection indicator
npx create-keepkey-app my-app --no-connection-indicator
```

## Templates

### Basic Template

A minimal setup with essential KeepKey integration features:

- Next.js application with TypeScript
- KeepKey connection indicator
- Chakra UI styling
- Basic app structure

### Full Template

A complete application with additional features:

- Everything in the basic template
- Multiple page examples
- Extended component library
- Pioneer SDK integration
- Example wallet connections
- Transaction signing examples

## Structure

A typical generated project will have the following structure:

```
my-app/
├── public/
│   └── images/
│       └── logos/
│           └── keepkey_logo.png
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── KKConnectionStatus.tsx
│   │   └── ui/
│   └── lib/
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Requirements

- Node.js 18.0.0 or later
- npm, yarn, or pnpm

## Development

```bash
# Clone the repository
git clone https://github.com/keepkey/keepkey-template-monorepo.git

# Navigate to the CLI package
cd keepkey-template-monorepo/packages/create-keepkey-cli

# Install dependencies
npm install

# Build the package
npm run build

# Link for local development
npm link

# Run tests
npm test
```

## License

MIT 