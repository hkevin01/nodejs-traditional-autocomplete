# 🚀 Node.js Quick Study Guide & Cheatsheet
*SparkNotes Style - Essential Knowledge for Rapid Learning*

---

## 📋 Table of Contents
1. [ES Modules Essentials](#-es-modules-essentials)
2. [Core Node.js APIs](#-core-nodejs-apis)
3. [Async Programming](#-async-programming)
4. [File System Operations](#-file-system-operations)
5. [HTTP & Networking](#-http--networking)
6. [Error Handling](#-error-handling)
7. [Performance & Memory](#-performance--memory)
8. [Testing & Debugging](#-testing--debugging)
9. [Quick Commands](#-quick-commands)

---

## 🔄 ES Modules Essentials

### **Import/Export Patterns**
```javascript
// ✅ ES Module Imports
import fs from 'fs';                    // Default import
import { readFile, writeFile } from 'fs/promises';  // Named imports
import * as path from 'path';           // Namespace import
import { fileURLToPath } from 'url';    // Specific named import

// ✅ ES Module Exports
export default MyClass;                 // Default export
export { myFunction, myVariable };      // Named exports
export const myConst = 'value';         // Direct export
export * from './other-module.js';      // Re-export all
```

### **⚡ Quick Migration from CommonJS**
| CommonJS | ES Modules |
|----------|------------|
| `require('fs')` | `import fs from 'fs'` |
| `const { readFile } = require('fs/promises')` | `import { readFile } from 'fs/promises'` |
| `module.exports = {}` | `export default {}` |
| `exports.fn = fn` | `export { fn }` |
| `__dirname` | `path.dirname(fileURLToPath(import.meta.url))` |
| `__filename` | `fileURLToPath(import.meta.url)` |

---

## 🔧 Core Node.js APIs

### **Essential Built-in Modules**
```javascript
import fs from 'fs';                    // File system
import { readFile } from 'fs/promises'; // Async file operations
import path from 'path';                // Path utilities
import { createServer } from 'http';    // HTTP server
import { createServer as httpsServer } from 'https'; // HTTPS
import { fileURLToPath } from 'url';    // URL utilities
import { createHash } from 'crypto';    // Cryptography
import os from 'os';                    // Operating system
import process from 'process';          // Process info
```

### **🎯 Common Path Operations**
```javascript
// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path manipulations
path.join('/users', 'kevin', 'file.txt')     // Cross-platform paths
path.resolve('relative/path')                 // Absolute path
path.extname('file.txt')                     // '.txt'
path.basename('/path/file.txt')              // 'file.txt'
path.dirname('/path/file.txt')               // '/path'
```

---

## ⚡ Async Programming

### **Promise Patterns**
```javascript
// ✅ Basic async/await
async function getData() {
  try {
    const data = await fetch('/api/data');
    return await data.json();
  } catch (error) {
    console.error('Failed:', error);
    throw error;
  }
}

// ✅ Concurrent operations
const results = await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchComments()
]);

// ✅ Graceful failure handling
const results = await Promise.allSettled([
  risky(), operation(), another()
]);
results.forEach((result, i) => {
  if (result.status === 'fulfilled') {
    console.log(`Success ${i}:`, result.value);
  } else {
    console.log(`Failed ${i}:`, result.reason);
  }
});

// ✅ Race conditions
const fastest = await Promise.race([
  fetchFromCache(),
  fetchFromDB(),
  fetchFromAPI()
]);
```

### **🔄 Stream Processing**
```javascript
import { Readable, Transform, Writable } from 'stream';
import { pipeline } from 'stream/promises';

// Custom readable stream
class DataGenerator extends Readable {
  constructor(options) {
    super({ objectMode: true, ...options });
    this.count = 0;
  }
  
  _read() {
    if (this.count < 10) {
      this.push({ id: this.count++, data: 'value' });
    } else {
      this.push(null); // End stream
    }
  }
}

// Transform stream
class DataProcessor extends Transform {
  constructor(options) {
    super({ objectMode: true, ...options });
  }
  
  _transform(chunk, encoding, callback) {
    const processed = { ...chunk, processed: true };
    callback(null, processed);
  }
}

// Use pipeline for error handling
await pipeline(
  new DataGenerator(),
  new DataProcessor(),
  new Writable({
    objectMode: true,
    write(chunk, encoding, callback) {
      console.log('Processed:', chunk);
      callback();
    }
  })
);
```

---

## 📁 File System Operations

### **Modern Async File Operations**
```javascript
import { readFile, writeFile, stat, unlink, mkdir } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';

// ✅ Basic file operations
const content = await readFile('file.txt', 'utf-8');
await writeFile('output.txt', 'Hello World', 'utf-8');
const stats = await stat('file.txt');
await unlink('file.txt');             // Delete file
await mkdir('new-dir', { recursive: true });

// ✅ JSON operations
const data = { name: 'John', age: 30 };
await writeFile('data.json', JSON.stringify(data, null, 2));
const loaded = JSON.parse(await readFile('data.json', 'utf-8'));

// ✅ Stream large files
const readable = createReadStream('large-input.txt');
const writable = createWriteStream('large-output.txt');
readable.pipe(writable);

// ✅ Check file exists
try {
  await stat('file.txt');
  console.log('File exists');
} catch (error) {
  if (error.code === 'ENOENT') {
    console.log('File does not exist');
  }
}
```

---

## 🌐 HTTP & Networking

### **HTTP Server**
```javascript
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import path from 'path';

const server = createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // JSON response
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'GET' && req.url === '/api/health') {
    res.statusCode = 200;
    res.end(JSON.stringify({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }));
  } else if (req.method === 'POST' && req.url === '/api/data') {
    // Parse JSON body
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        res.statusCode = 200;
        res.end(JSON.stringify({ received: data, processed: true }));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
```

### **HTTP Client (Fetch)**
```javascript
// ✅ Modern fetch usage
const response = await fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
  },
  body: JSON.stringify({ key: 'value' })
});

if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}

const data = await response.json();
```

---

## 🛡️ Error Handling

### **Professional Error Patterns**
```javascript
// ✅ Custom error classes
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
  }
}

// ✅ Async error handling
async function safeOperation() {
  try {
    const result = await riskyOperation();
    return { success: true, data: result };
  } catch (error) {
    console.error('Operation failed:', error);
    
    if (error instanceof ValidationError) {
      return { success: false, error: 'Validation failed', field: error.field };
    } else if (error instanceof NetworkError) {
      return { success: false, error: 'Network issue', statusCode: error.statusCode };
    } else {
      return { success: false, error: 'Unknown error' };
    }
  }
}

// ✅ Global error handlers
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
```

---

## 📊 Performance & Memory

### **Memory Management**
```javascript
// ✅ Monitor memory usage
function checkMemory() {
  const usage = process.memoryUsage();
  return {
    rss: `${(usage.rss / 1024 / 1024).toFixed(2)} MB`,        // Resident Set Size
    heapTotal: `${(usage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
    heapUsed: `${(usage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
    external: `${(usage.external / 1024 / 1024).toFixed(2)} MB`
  };
}

// ✅ Performance timing
console.time('Operation');
await expensiveOperation();
console.timeEnd('Operation');

// ✅ Process information
console.log({
  nodeVersion: process.version,
  platform: process.platform,
  architecture: process.arch,
  uptime: `${process.uptime().toFixed(2)}s`,
  pid: process.pid,
  cwd: process.cwd()
});
```

---

## 🧪 Testing & Debugging

### **Basic Testing Patterns**
```javascript
// ✅ Simple assertion testing
import assert from 'assert';

function test(description, testFn) {
  try {
    testFn();
    console.log(`✅ ${description}`);
  } catch (error) {
    console.log(`❌ ${description}: ${error.message}`);
  }
}

// Usage
test('Math operations work', () => {
  assert.strictEqual(2 + 2, 4);
  assert.strictEqual(Math.max(1, 2, 3), 3);
});

test('Async operations work', async () => {
  const result = await Promise.resolve('success');
  assert.strictEqual(result, 'success');
});
```

### **🔍 Debugging Tips**
```javascript
// ✅ Debug logging
const DEBUG = process.env.NODE_ENV === 'development';
function debug(...args) {
  if (DEBUG) console.log('[DEBUG]', ...args);
}

// ✅ Inspect objects
import { inspect } from 'util';
console.log(inspect(complexObject, { colors: true, depth: 3 }));

// ✅ Environment variables
const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiKey: process.env.API_KEY
};
```

---

## ⚡ Quick Commands

### **Package.json Scripts**
```json
{
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js",
    "test": "node test.js",
    "debug": "node --inspect server.js"
  }
}
```

### **🔧 Common CLI Commands**
```bash
# ES Modules execution
node script.mjs                    # Run ES module
node --input-type=module script.js # Force ES modules

# Development helpers
node --watch app.js                # Auto-restart on changes
node --inspect app.js              # Debug mode
node --trace-warnings app.js       # Show deprecation warnings

# Package management
npm init -y                        # Initialize package.json
npm install package-name           # Install dependency
npm install -D package-name        # Install dev dependency
npm run script-name                # Run package script

# Environment
export NODE_ENV=production         # Set environment
export DEBUG=*                     # Enable debug logs
```

---

## 🎯 Quick Reference Summary

| **Category** | **Essential Command/Pattern** |
|-------------|-------------------------------|
| **Import** | `import { readFile } from 'fs/promises'` |
| **Export** | `export default MyClass` |
| **Async** | `const result = await operation()` |
| **File** | `await writeFile('file.txt', data)` |
| **Server** | `createServer((req, res) => {...})` |
| **Error** | `try { ... } catch (error) { ... }` |
| **Debug** | `console.log(inspect(obj, {colors: true}))` |
| **Test** | `assert.strictEqual(actual, expected)` |

---

**📖 Study Tips:**
- Start with ES Modules - they're the future
- Master async/await before moving to complex patterns
- Always handle errors explicitly
- Use built-in modules before external packages
- Debug early and often with console methods

**⚡ Speed Learning Path:**
1. ES Modules syntax → 2. Async patterns → 3. File operations → 4. HTTP basics → 5. Error handling → 6. Testing

---

*Updated: January 2026 | Node.js 22.x LTS*
