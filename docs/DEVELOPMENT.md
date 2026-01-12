# Development Guide

## Traditional Autocomplete Development Workflow

This guide explains how to develop effectively using traditional IntelliSense and autocomplete without AI assistance.

## 🛠️ Development Environment Setup

### 1. Editor Configuration

Ensure VS Code is properly configured:

```bash
# Check VS Code settings
code .vscode/settings.json
```

Key configurations:
- `"github.copilot.enable": false` - AI disabled
- `"typescript.suggest.enabled": true` - Traditional autocomplete enabled
- `"editor.quickSuggestions": true` - IntelliSense suggestions

### 2. TypeScript Language Server

The TypeScript Language Server provides:
- **Auto-completion** based on types and imports
- **Parameter hints** for function calls
- **Hover information** for symbols
- **Go to definition** and **find references**
- **Error detection** and **quick fixes**

### 3. Traditional Development Features

#### Autocomplete Sources
1. **TypeScript compiler** - Type-aware suggestions
2. **Import statements** - Auto-import from installed packages
3. **Local symbols** - Variables, functions, classes in scope
4. **Built-in APIs** - Node.js, DOM, and library definitions

#### IntelliSense Triggers
- `.` (dot notation) - Member access
- `Ctrl+Space` - Manual trigger
- Typing characters - Automatic suggestions
- `<` - JSX tag completion

## 📝 Code Quality Tools

### ESLint Configuration

ESLint provides real-time code analysis:

```javascript
// Traditional ESLint rules for quality
{
  "@typescript-eslint/no-unused-vars": "error",
  "@typescript-eslint/explicit-function-return-type": "off",
  "import/order": "error",
  "prefer-const": "error"
}
```

### Prettier Formatting

Automatic code formatting on save:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

## 🔍 Debugging Strategies

### 1. VS Code Debugger

#### Next.js Debugging
```json
{
  "name": "Debug Next.js App",
  "type": "node",
  "request": "launch",
  "program": "${workspaceFolder}/node_modules/.bin/next",
  "args": ["dev"]
}
```

#### Express API Debugging
```json
{
  "name": "Debug Express API",
  "type": "node",
  "request": "launch",
  "program": "${workspaceFolder}/apps/api/src/index.ts",
  "runtimeArgs": ["--loader", "ts-node/esm"]
}
```

### 2. Console Debugging

```typescript
// Strategic console.log placement
console.log('Debug point:', { variable, context });

// Use debugger statement
debugger; // Pauses execution in debugger

// Winston logger for production
logger.debug('Debug info', { data });
```

### 3. Browser DevTools

- **React DevTools** - Component inspection
- **Network tab** - API call debugging
- **Console** - Error tracking
- **Sources** - Breakpoint debugging

## 🧪 Testing Approach

### Unit Testing with Vitest

```typescript
// Example unit test
import { describe, it, expect } from 'vitest';
import { calculateSum } from './math-utils.js';

describe('Math utilities', () => {
  it('should calculate sum correctly', () => {
    expect(calculateSum(2, 3)).toBe(5);
  });
});
```

### Integration Testing

```typescript
// API integration test
import request from 'supertest';
import { app } from '../src/app.js';

describe('Health API', () => {
  it('should return health status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
      
    expect(response.body.status).toBe('healthy');
  });
});
```

### E2E Testing with Playwright

```typescript
// E2E test example
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Node.js Traditional Autocomplete');
});
```

## 📚 Code Navigation

### VS Code Navigation Features

#### Go to Definition
- `F12` or `Ctrl+Click` - Navigate to symbol definition
- `Alt+F12` - Peek definition
- `Ctrl+Shift+F12` - Go to implementation

#### Find References
- `Shift+F12` - Find all references
- `Alt+Shift+F12` - Peek references

#### Symbol Search
- `Ctrl+T` - Go to symbol in workspace
- `Ctrl+Shift+O` - Go to symbol in file
- `Ctrl+P` - Quick open files

#### Breadcrumb Navigation
- Click breadcrumbs at top of editor
- `Ctrl+Shift+.` - Focus breadcrumbs

## 📦 Package Management

### pnpm Workspace Commands

```bash
# Install dependencies
pnpm install

# Add dependency to specific package
pnpm add --filter @nodejs-traditional-autocomplete/web react-query

# Add dev dependency
pnpm add --filter @nodejs-traditional-autocomplete/api -D @types/express

# Run script in specific package
pnpm --filter web dev

# Update dependencies
pnpm update

# Check outdated packages
pnpm outdated
```

### Dependency Management

```json
// package.json workspace configuration
{
  "workspaces": ["apps/*", "packages/*"],
  "dependencies": {
    // Shared dependencies here
  },
  "devDependencies": {
    // Development tools
  }
}
```

## ⚡ Performance Optimization

### TypeScript Performance

```json
// tsconfig.json optimizations
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo"
  },
  "ts-node": {
    "swc": true  // Use SWC for faster compilation
  }
}
```

### Build Performance

```json
// turbo.json for faster builds
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    }
  }
}
```

### Development Server Performance

```javascript
// next.config.js optimizations
module.exports = {
  experimental: {
    turbo: true,  // Enable Turbopack (when available)
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};
```

## 🔧 Troubleshooting Common Issues

### TypeScript Issues

1. **Module not found**
   ```bash
   # Clear TypeScript cache
   rm -rf node_modules/.cache
   pnpm install
   ```

2. **Type errors in dependencies**
   ```typescript
   // Add to types/global.d.ts
   declare module 'problematic-module' {
     const content: any;
     export default content;
   }
   ```

3. **Slow IntelliSense**
   ```json
   // In tsconfig.json
   {
     "exclude": ["node_modules", "dist", ".next"]
   }
   ```

### ESLint Issues

1. **Parsing errors**
   ```bash
   # Update parser
   pnpm add -D @typescript-eslint/parser@latest
   ```

2. **Configuration conflicts**
   ```javascript
   // Check eslint.config.js order
   export default [
     eslint.configs.recommended,
     ...tseslint.configs.recommended,
     prettier // Must be last
   ];
   ```

### Hot Reload Issues

1. **Next.js not reloading**
   ```bash
   # Restart development server
   pnpm dev:web
   ```

2. **File watching problems**
   ```bash
   # Increase file watchers (Linux)
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

## 📊 Code Metrics

### Quality Metrics

```bash
# Type coverage
pnpm type-check --strict

# Lint score
pnpm lint --format=json > lint-report.json

# Test coverage
pnpm test --coverage

# Bundle size analysis
pnpm build && npx bundlesize
```

### Performance Metrics

```bash
# TypeScript compilation time
time pnpm type-check

# Build time
time pnpm build

# Test execution time
time pnpm test
```

## 📨 Best Practices

### Code Organization

1. **File naming conventions**
   - `PascalCase` for React components
   - `camelCase` for utilities
   - `kebab-case` for files

2. **Import organization**
   ```typescript
   // External dependencies
   import React from 'react';
   import express from 'express';
   
   // Internal modules
   import { utils } from '@/lib/utils';
   import { Component } from '@/components/Component';
   
   // Relative imports
   import './styles.css';
   ```

3. **Type definitions**
   ```typescript
   // interfaces.ts
   export interface User {
     id: string;
     name: string;
     email: string;
   }
   
   // Use consistent naming
   export type UserWithTimestamps = User & {
     createdAt: Date;
     updatedAt: Date;
   };
   ```

### Traditional Development Workflow

1. **Start with types** - Define interfaces first
2. **Use IntelliSense** - Rely on autocomplete suggestions
3. **Write tests early** - Test-driven development
4. **Refactor frequently** - Use IDE refactoring tools
5. **Document as you go** - JSDoc comments for complex logic

### Performance Best Practices

1. **Lazy loading** - Import components/modules when needed
2. **Tree shaking** - Use ES modules for better optimization
3. **Code splitting** - Separate bundles for different features
4. **Memoization** - Cache expensive calculations

---

**Remember: Traditional development focuses on understanding the tools, reading documentation, and building expertise through practice rather than relying on AI assistance.**