// Node.js REPL Quick Reference
// Alternative to Quokka: Use Node.js REPL directly!
// Run: node (then paste code line by line)
// Or: node -e "console.log('Hello World!')"

// 📋 Basic REPL Commands:
// .help     - Show help
// .exit     - Exit REPL
// .clear    - Clear context
// .save     - Save session to file
// .load     - Load file into session

// 🚀 Quick Examples for REPL:

// Variables
const greeting = 'Hello from REPL!';
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);

// Functions
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Objects
const user = {
  name: 'John Doe',
  age: 30,
  greet() {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
  }
};

// Arrays
const fruits = ['apple', 'banana', 'cherry'];
const uppercaseFruits = fruits.map(f => f.toUpperCase());
const longFruits = fruits.filter(f => f.length > 5);

// Async/Await (works in REPL!)
async function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => resolve('Data fetched!'), 1000);
  });
}

// Date/Time
const now = new Date();
const timestamp = Date.now();
const formatted = now.toLocaleString();

// Math
const randomNum = Math.random();
const rounded = Math.round(randomNum * 100);
const power = Math.pow(2, 8);

// 💡 REPL Tips:
// - Type any expression and see result immediately
// - Use _ to reference last result
// - Use console.log() for formatted output
// - Use .break to exit multi-line statements
// - Use Tab for autocompletion

// 🎯 Try these in Node REPL:
console.log('=== Copy and paste these into Node REPL ===');
console.log('greeting');
console.log('sum');
console.log('fibonacci(10)');
console.log('user.greet()');
console.log('uppercaseFruits');
console.log('Math.PI');
console.log('process.version');
console.log('Object.keys(process.env).length');

// 📖 Multi-line example for REPL:
/*
function calculator(a, b) {
  return {
    add: a + b,
    subtract: a - b,
    multiply: a * b,
    divide: a / b
  };
}

calculator(10, 5)
*/

// 🔄 Interactive loop example:
/*
for (let i = 1; i <= 5; i++) {
  console.log(`Count: ${i}`);
}
*/

// This file demonstrates what you can do in Node REPL
// REPL gives you immediate feedback like Quokka, but line by line!