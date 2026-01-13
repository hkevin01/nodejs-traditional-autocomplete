#!/usr/bin/env node

/**
 * 🚀 Node.js Hello World - ES Modules Demo
 * 
 * This demonstrates modern Node.js development with ES Modules,
 * async operations, and professional patterns.
 * 
 * Run with: node hello-world-nodejs.mjs
 * Or: npm run demo:nodejs
 */

import { readFile, writeFile } from 'fs/promises';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import path from 'path';

// Get current file path (ES Modules equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 🎯 Modern Node.js Features Demonstration
 */
class NodeJSDemo {
  constructor() {
    this.startTime = new Date();
    this.serverPort = 3001;
  }

  /**
   * 📝 File System Operations with ES Modules
   */
  async demonstrateFileOps() {
    console.log('\n📁 FILE SYSTEM OPERATIONS');
    console.log('='.repeat(30));
    
    const data = {
      message: 'Hello from Node.js ES Modules!',
      timestamp: new Date().toISOString(),
      features: [
        'ES Modules (import/export)',
        'Async/Await Pattern',
        'Modern JavaScript Syntax',
        'Professional Error Handling'
      ],
      nodeVersion: process.version,
      platform: process.platform
    };

    try {
      // Write JSON file
      const filename = path.join(__dirname, 'demo-output.json');
      await writeFile(filename, JSON.stringify(data, null, 2));
      console.log(`✅ Created: ${filename}`);
      
      // Read it back
      const content = await readFile(filename, 'utf-8');
      const parsed = JSON.parse(content);
      console.log('📖 File contents:', parsed.message);
      console.log('🕐 Created:', parsed.timestamp);
      
    } catch (error) {
      console.error('❌ File operation failed:', error.message);
    }
  }

  /**
   * 🌐 HTTP Server with Modern Patterns
   */
  async createWebServer() {
    console.log('\n🌐 HTTP SERVER');
    console.log('='.repeat(20));
    
    const server = createServer(async (req, res) => {
      // CORS headers for development
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      
      const response = {
        message: '🚀 Hello from Node.js ES Modules Server!',
        timestamp: new Date().toISOString(),
        url: req.url,
        method: req.method,
        uptime: `${((Date.now() - this.startTime) / 1000).toFixed(2)}s`,
        nodeInfo: {
          version: process.version,
          platform: process.platform,
          arch: process.arch,
          memory: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
        }
      };
      
      res.end(JSON.stringify(response, null, 2));
    });

    server.listen(this.serverPort, () => {
      console.log(`🚀 Server running at http://localhost:${this.serverPort}`);
      console.log('📱 Try: curl http://localhost:3001');
    });

    return server;
  }

  /**
   * ⚡ Async Operations Demo
   */
  async demonstrateAsyncPatterns() {
    console.log('\n⚡ ASYNC PATTERNS');
    console.log('='.repeat(20));
    
    // Simulated async operations
    const operations = [
      { name: 'Database Query', delay: 100 },
      { name: 'API Request', delay: 200 },
      { name: 'File Processing', delay: 150 }
    ];

    console.log('🔄 Running concurrent operations...');
    console.time('Async Operations');
    
    const results = await Promise.all(
      operations.map(async (op) => {
        await new Promise(resolve => setTimeout(resolve, op.delay));
        return {
          operation: op.name,
          completed: new Date().toISOString(),
          success: true
        };
      })
    );

    console.timeEnd('Async Operations');
    console.log('✅ All operations completed:');
    results.forEach(result => {
      console.log(`  • ${result.operation}: ${result.success ? '✅' : '❌'}`);
    });
  }

  /**
   * 🎯 Main Demo Runner
   */
  async run() {
    console.log('🚀 NODE.JS ES MODULES HELLO WORLD DEMO');
    console.log('='.repeat(45));
    console.log(`📅 Started: ${this.startTime.toISOString()}`);
    console.log(`🏠 Directory: ${__dirname}`);
    console.log(`📦 Node.js: ${process.version}`);
    
    try {
      await this.demonstrateFileOps();
      await this.demonstrateAsyncPatterns();
      
      // Start server (comment out if you don't want it running)
      // const server = await this.createWebServer();
      
      console.log('\n✅ DEMO COMPLETED SUCCESSFULLY!');
      console.log('='.repeat(30));
      console.log('🎯 Key Features Demonstrated:');
      console.log('  • ✅ ES Modules (import/export)');
      console.log('  • ✅ Modern async/await patterns');
      console.log('  • ✅ File system operations');
      console.log('  • ✅ Professional error handling');
      console.log('  • ✅ HTTP server creation');
      console.log('  • ✅ Contemporary JavaScript syntax');
      
    } catch (error) {
      console.error('❌ Demo failed:', error.message);
      process.exit(1);
    }
  }
}

// 🎯 Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const demo = new NodeJSDemo();
  demo.run().catch(console.error);
}

// 📦 Export for use as module
export { NodeJSDemo };
export default NodeJSDemo;
