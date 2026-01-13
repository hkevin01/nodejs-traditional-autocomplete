// 🚀 Live JavaScript Demonstration with Code Runner
// Right-click → "Run Code" or press Ctrl+Alt+N
// Check OUTPUT panel for results! ✨

console.log('👋 Hello World!'); 
// 👆 Result appears inline as you type!

// Platform Information
const platform = process.platform;
const nodeVersion = process.version;
const arch = process.arch;

console.log(`🖥️  Platform: ${platform}`);
console.log(`⚙️  Node: ${nodeVersion}`);
console.log(`🏗️  Architecture: ${arch}`);

// Memory Usage (live updates!)
const memory = process.memoryUsage();
console.log('💾 Memory:', memory);

// Simple Calculations
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);
const average = sum / numbers.length;

console.log('🔢 Numbers:', numbers);
console.log('➕ Sum:', sum);
console.log('📊 Average:', average);

// String Manipulation
const message = 'Traditional Autocomplete';
const reversed = message.split('').reverse().join('');
const uppercase = message.toUpperCase();

console.log('📝 Original:', message);
console.log('🔄 Reversed:', reversed);
console.log('📢 Uppercase:', uppercase);

// Array Operations
const fruits = ['apple', 'banana', 'cherry', 'date'];
const longFruits = fruits.filter(fruit => fruit.length > 5);
const fruitLengths = fruits.map(fruit => fruit.length);

console.log('🍎 Fruits:', fruits);
console.log('📏 Long fruits:', longFruits);
console.log('📐 Lengths:', fruitLengths);

// Object Manipulation
const person = {
  name: 'John Doe',
  age: 30,
  city: 'New York',
  hobbies: ['reading', 'coding', 'hiking']
};

console.log('👤 Person:', person);
console.log('🎯 Name:', person.name);
console.log('🎨 Hobbies:', person.hobbies.join(', '));

// Date and Time
const now = new Date();
const timestamp = now.getTime();
const isoString = now.toISOString();

console.log('🕐 Now:', now);
console.log('⏱️  Timestamp:', timestamp);
console.log('📅 ISO:', isoString);

// Random Numbers
const randomNum = Math.random();
const randomInt = Math.floor(Math.random() * 100);
const dice = Math.floor(Math.random() * 6) + 1;

console.log('🎲 Random:', randomNum);
console.log('🔢 Random Int:', randomInt);
console.log('🎯 Dice Roll:', dice);

// Try changing any values above and watch the results update instantly!
// This is the power of Code Runner - simple execution without any setup!