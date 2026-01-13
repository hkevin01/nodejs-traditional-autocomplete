// 🚀 Node.js Hello World for Code Runner
// Right-click → "Run Code" or press Ctrl+Alt+N
// Watch the magic happen! ✨

// Basic Hello World
console.log('👋 Hello World from Node.js!');
console.log('🌍 Welcome to live JavaScript coding!');

// System Information
const info = {
  nodeVersion: process.version,
  platform: process.platform,
  architecture: process.arch,
  currentTime: new Date().toLocaleString()
};

console.log('💻 System Info:', info);

// Simple Math
const a = 10;
const b = 5;
const sum = a + b;
const product = a * b;
const power = Math.pow(a, 2);

console.log(`➕ ${a} + ${b} = ${sum}`);
console.log(`✖️ ${a} × ${b} = ${product}`);
console.log(`🔢 ${a}² = ${power}`);

// Working with Arrays
const fruits = ['🍎 apple', '🍌 banana', '🍊 orange', '🍇 grape'];
const fruitCount = fruits.length;
const firstFruit = fruits[0];
const lastFruit = fruits[fruits.length - 1];

console.log(`🧺 We have ${fruitCount} fruits`);
console.log(`🥇 First: ${firstFruit}`);
console.log(`🥉 Last: ${lastFruit}`);

// String Operations
const message = 'Hello Code Runner!';
const reversed = message.split('').reverse().join('');
const uppercase = message.toUpperCase();
const wordCount = message.split(' ').length;

console.log(`📝 Original: ${message}`);
console.log(`🔄 Reversed: ${reversed}`);
console.log(`📢 Uppercase: ${uppercase}`);
console.log(`📊 Word count: ${wordCount}`);

// Date and Time Fun
const now = new Date();
const timestamp = now.getTime();
const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
const timeOnly = now.toLocaleTimeString();

console.log(`⏰ Current time: ${timeOnly}`);
console.log(`📅 Today is: ${dayOfWeek}`);
console.log(`🕐 Timestamp: ${timestamp}`);

// Random Numbers
const randomFloat = Math.random();
const randomInt = Math.floor(Math.random() * 100);
const diceRoll = Math.floor(Math.random() * 6) + 1;

console.log(`🎲 Random float: ${randomFloat.toFixed(4)}`);
console.log(`🔢 Random int (0-99): ${randomInt}`);
console.log(`🎯 Dice roll: ${diceRoll}`);

// Try changing any values above and re-run to see results!
// This is the power of Code Runner - simple execution! 🎉