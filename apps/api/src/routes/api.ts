import express, { Router } from 'express';
import { z } from 'zod';
import { logger } from '../utils/logger.js';

const router: express.Router = Router();

// API information endpoint
router.get('/', (_req, res) => {
  res.json({
    name: 'Node.js Traditional Autocomplete API',
    version: '0.1.0',
    description: 'RESTful API with traditional development tools',
    endpoints: {
      '/': 'API information',
      '/health': 'Health check',
      '/health/detailed': 'Detailed health information',
      '/api/autocomplete': 'Autocomplete suggestions (traditional)',
      '/api/typescript': 'TypeScript language features',
    },
    features: {
      traditionalAutocomplete: true,
      aiAssistance: false,
      typescriptSupport: true,
      eslintIntegration: true,
    },
    documentation: {
      openapi: '/api/docs',
      postman: '/api/postman',
    },
  });
});

// Traditional autocomplete endpoint
const AutocompleteRequestSchema = z.object({
  query: z.string().min(1).max(100),
  context: z.string().optional(),
  language: z.enum(['typescript', 'javascript', 'json']).default('typescript'),
  maxResults: z.number().min(1).max(50).default(10),
});

router.post('/autocomplete', (req, res) => {
  try {
    const { query, language, maxResults } = AutocompleteRequestSchema.parse(req.body);
    
    logger.info(`Autocomplete request for query: "${query}" in ${language}`);
    
    // Traditional autocomplete logic (no AI)
    // This would integrate with TypeScript language server in a real implementation
    const suggestions = generateTraditionalSuggestions(query, language, maxResults);
    
    res.json({
      query,
      language,
      suggestions,
      metadata: {
        total: suggestions.length,
        source: 'typescript-lsp',
        aiAssistance: false,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn('Invalid autocomplete request:', error.errors);
      res.status(400).json({
        error: 'Invalid request',
        details: error.errors,
      });
    } else {
      logger.error('Autocomplete error:', error);
      res.status(500).json({
        error: 'Internal server error',
      });
    }
  }
});

// TypeScript language features endpoint
const TypeScriptRequestSchema = z.object({
  code: z.string(),
  filename: z.string().optional(),
  operation: z.enum(['hover', 'definition', 'references', 'rename', 'format']),
  position: z.object({
    line: z.number(),
    character: z.number(),
  }).optional(),
});

router.post('/typescript', (req, res) => {
  try {
    const { code, filename, operation, position } = TypeScriptRequestSchema.parse(req.body);
    
    logger.info(`TypeScript ${operation} request for file: ${filename || 'untitled'}`);
    
    // Traditional TypeScript language server operations
    const result = performTypeScriptOperation(code, operation, position);
    
    res.json({
      operation,
      filename,
      result,
      metadata: {
        source: 'typescript-compiler-api',
        aiAssistance: false,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn('Invalid TypeScript request:', error.errors);
      res.status(400).json({
        error: 'Invalid request',
        details: error.errors,
      });
    } else {
      logger.error('TypeScript operation error:', error);
      res.status(500).json({
        error: 'Internal server error',
      });
    }
  }
});

// Helper functions for traditional autocomplete
function generateTraditionalSuggestions(
  query: string, 
  language: string, 
  maxResults: number
): Array<{ label: string; kind: string; detail?: string; documentation?: string }> {
  // This is a simplified example - in a real implementation,
  // this would integrate with the TypeScript language server
  const commonSuggestions = {
    typescript: [
      { label: 'console.log', kind: 'method', detail: '(message?: any, ...optionalParams: any[]): void' },
      { label: 'Promise', kind: 'class', detail: 'Promise<T>' },
      { label: 'Array', kind: 'class', detail: 'Array<T>' },
      { label: 'function', kind: 'keyword' },
      { label: 'interface', kind: 'keyword' },
      { label: 'type', kind: 'keyword' },
      { label: 'const', kind: 'keyword' },
      { label: 'let', kind: 'keyword' },
      { label: 'var', kind: 'keyword' },
      { label: 'import', kind: 'keyword' },
    ],
    javascript: [
      { label: 'console.log', kind: 'method', detail: '(message?: any, ...optionalParams: any[]): void' },
      { label: 'setTimeout', kind: 'function', detail: '(callback: Function, ms: number): number' },
      { label: 'setInterval', kind: 'function', detail: '(callback: Function, ms: number): number' },
      { label: 'function', kind: 'keyword' },
      { label: 'const', kind: 'keyword' },
      { label: 'let', kind: 'keyword' },
      { label: 'var', kind: 'keyword' },
    ],
    json: [
      { label: '"string"', kind: 'property' },
      { label: '{}', kind: 'object' },
      { label: '[]', kind: 'array' },
      { label: 'true', kind: 'value' },
      { label: 'false', kind: 'value' },
      { label: 'null', kind: 'value' },
    ],
  };
  
  const suggestions = commonSuggestions[language as keyof typeof commonSuggestions] || [];
  return suggestions
    .filter(suggestion => suggestion.label.toLowerCase().includes(query.toLowerCase()))
    .slice(0, maxResults);
}

function performTypeScriptOperation(
  code: string, 
  operation: string, 
  position?: { line: number; character: number }
) {
  // This is a simplified example - in a real implementation,
  // this would use the TypeScript compiler API
  switch (operation) {
    case 'hover':
      return {
        contents: 'Type information would be displayed here',
        range: { start: position, end: position },
      };
    case 'definition':
      return {
        uri: 'file:///example.ts',
        range: { start: { line: 0, character: 0 }, end: { line: 0, character: 10 } },
      };
    case 'references':
      return [
        {
          uri: 'file:///example.ts',
          range: { start: { line: 0, character: 0 }, end: { line: 0, character: 10 } },
        },
      ];
    case 'rename':
      return {
        changes: {
          'file:///example.ts': [
            {
              range: { start: { line: 0, character: 0 }, end: { line: 0, character: 10 } },
              newText: 'newName',
            },
          ],
        },
      };
    case 'format':
      return {
        formattedCode: code.trim(),
        changes: [],
      };
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}

export { router as apiRouter };
