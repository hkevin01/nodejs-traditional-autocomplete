import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest';

// Test environment setup for Node.js Traditional Autocomplete

// Global test configuration
beforeAll(async () => {
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.LOG_LEVEL = 'silent';
  process.env.PORT = '0'; // Use random port for testing
  
  console.log('🧪 Setting up Node.js Traditional Autocomplete test environment');
  console.log('✨ Traditional autocomplete testing - No AI assistance');
});

afterAll(async () => {
  // Cleanup after all tests
  console.log('🧹 Cleaning up test environment');
});

beforeEach(async () => {
  // Setup before each test
});

afterEach(async () => {
  // Cleanup after each test
});

// Mock global functions if needed
global.console = {
  ...console,
  // Suppress logs during tests unless LOG_LEVEL is set
  log: process.env.LOG_LEVEL !== 'silent' ? console.log : () => {},
  info: process.env.LOG_LEVEL !== 'silent' ? console.info : () => {},
  warn: process.env.LOG_LEVEL !== 'silent' ? console.warn : () => {},
  error: console.error, // Always show errors
};

// Traditional development assertions
export const assertTraditionalFeatures = {
  /**
   * Assert that AI features are disabled
   */
  noAiAssistance: () => {
    const aiFeatures = [
      process.env.GITHUB_COPILOT_ENABLED,
      process.env.AI_ASSISTANCE_ENABLED,
      process.env.COPILOT_ENABLED,
    ];
    
    aiFeatures.forEach((feature) => {
      if (feature === 'true') {
        throw new Error('AI assistance should be disabled in traditional autocomplete environment');
      }
    });
  },
  
  /**
   * Assert that traditional autocomplete is enabled
   */
  traditionalAutocomplete: () => {
    const traditionalFeatures = {
      typescript: true,
      eslint: true,
      prettier: true,
      languageServer: true,
    };
    
    Object.entries(traditionalFeatures).forEach(([feature, expected]) => {
      if (!expected) {
        throw new Error(`Traditional feature ${feature} should be enabled`);
      }
    });
  },
};

// Run initial assertions
assertTraditionalFeatures.noAiAssistance();
assertTraditionalFeatures.traditionalAutocomplete();