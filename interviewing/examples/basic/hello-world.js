#!/usr/bin/env node

/**
 * Hello World - Node.js Example
 * Basic Node.js demonstration with platform information
 */

console.log('👋 Hello World! 🌍');
console.log('Node version:', process.version);
console.log('Platform:', process.platform);
console.log('Architecture:', process.arch);
console.log('Current working directory:', process.cwd());
console.log('Memory usage:', process.memoryUsage());
console.log('Uptime:', process.uptime() + ' seconds');

// Environment variables
console.log('\n🔧 Environment:');
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('PATH length:', process.env.PATH ? process.env.PATH.length : 0);

// Simple calculations
console.log('\n🧮 Simple calculations:');
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);
console.log('Numbers:', numbers);
console.log('Sum:', sum);
console.log('Average:', sum / numbers.length);

// Async example
console.log('\n⏰ Timing example:');
const start = Date.now();
setTimeout(() => {
  const elapsed = Date.now() - start;
  console.log(`Timer completed in ${elapsed}ms`);
}, 100);