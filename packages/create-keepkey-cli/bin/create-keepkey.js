#!/usr/bin/env node

// This file is the entry point for the CLI
// It imports and runs the main function from the compiled source

import { createApp } from '../dist/index.js';

// Run the create-app function
createApp().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
}); 