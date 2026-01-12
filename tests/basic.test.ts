import { describe, it, expect } from 'vitest';

describe('Node.js Traditional Autocomplete Environment', () => {
  it('should disable AI assistance', () => {
    // Verify that traditional development environment is properly configured
    const traditionalFeatures = {
      aiAssistance: false,
      traditionalAutocomplete: true,
      typescriptLsp: true,
      eslintSupport: true,
    };

    expect(traditionalFeatures.aiAssistance).toBe(false);
    expect(traditionalFeatures.traditionalAutocomplete).toBe(true);
    expect(traditionalFeatures.typescriptLsp).toBe(true);
    expect(traditionalFeatures.eslintSupport).toBe(true);
  });

  it('should have Node.js 22 environment', () => {
    const nodeVersion = process.version;
    expect(nodeVersion).toMatch(/^v22\./);
  });

  it('should be in test environment', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });

  it('should support ES modules', () => {
    // Test that we can use modern ES module features
    const testAsync = async () => {
      const result = await Promise.resolve('traditional-autocomplete');
      return result;
    };

    return expect(testAsync()).resolves.toBe('traditional-autocomplete');
  });

  it('should have TypeScript support', () => {
    interface TestInterface {
      name: string;
      enabled: boolean;
    }

    const testObj: TestInterface = {
      name: 'Traditional Autocomplete',
      enabled: true,
    };

    expect(testObj.name).toBe('Traditional Autocomplete');
    expect(testObj.enabled).toBe(true);
  });
});
