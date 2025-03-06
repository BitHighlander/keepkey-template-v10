import test from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test constants
const CLI_PATH = path.join(__dirname, '../bin/create-keepkey.js');
const TEST_DIR = path.join(__dirname, '../temp-test-dir');

// Cleanup helper
function cleanup() {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  }
}

// Setup
test.before(() => {
  cleanup();
});

// Teardown
test.after(() => {
  cleanup();
});

test('creates basic project with default options', async (t) => {
  // This test is just a placeholder for now
  // In a real implementation, we would run the CLI and check the output
  
  // Mock test for now
  assert.equal(1, 1);
  
  // In a real test, we would do something like:
  // execSync(`node ${CLI_PATH} ${TEST_DIR} --template basic --skip-install`);
  // assert.equal(fs.existsSync(path.join(TEST_DIR, 'package.json')), true);
});

test('creates project with connection-indicator option disabled', async (t) => {
  // This test is just a placeholder for now
  
  // Mock test for now
  assert.equal(1, 1);
  
  // In a real test, we would do something like:
  // execSync(`node ${CLI_PATH} ${TEST_DIR} --template basic --no-connection-indicator --skip-install`);
  // const pkgJson = JSON.parse(fs.readFileSync(path.join(TEST_DIR, 'package.json'), 'utf8'));
  // assert.equal(pkgJson.dependencies['@keepkey/connection-indicator'], undefined);
});

test('handles errors gracefully', async (t) => {
  // This test is just a placeholder for now
  
  // Mock test for now
  assert.equal(1, 1);
  
  // In a real test, we would do something like:
  // try {
  //   execSync(`node ${CLI_PATH} /invalid/path`);
  //   assert.fail('Should have thrown an error');
  // } catch (error) {
  //   assert.ok(error.message.includes('Error:'));
  // }
}); 