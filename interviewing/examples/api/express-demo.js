#!/usr/bin/env node

/**
 * Express API Demo
 * Simple RESTful API with user management
 * Run with: node express-demo.js
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// In-memory database
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-0123', address: '123 Main St' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-0456', address: '456 Oak Ave' }
];
let nextId = 3;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../../public')));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes

// Serve React demo
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../react/form-demo.html'));
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    users_count: users.length,
    node_version: process.version
  });
});

// Get all users
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    data: users,
    count: users.length
  });
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }
  
  res.json({
    success: true,
    data: user
  });
});

// Create new user
app.post('/api/users', (req, res) => {
  const { name, email, phone, address } = req.body;
  
  // Validation
  const errors = [];
  if (!name?.trim()) errors.push('Name is required');
  if (!email?.trim()) errors.push('Email is required');
  if (!phone?.trim()) errors.push('Phone is required');
  if (!address?.trim()) errors.push('Address is required');
  
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Invalid email format');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }
  
  // Check duplicate email
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({
      success: false,
      error: 'User with this email already exists'
    });
  }
  
  // Create user
  const newUser = {
    id: nextId++,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    address: address.trim(),
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  console.log(`✅ New user created: ${newUser.name} (ID: ${newUser.id})`);
  
  res.status(201).json({
    success: true,
    data: newUser,
    message: 'User created successfully'
  });
});

// Update user
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }
  
  const { name, email, phone, address } = req.body;
  
  users[userIndex] = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email,
    phone: phone || users[userIndex].phone,
    address: address || users[userIndex].address,
    updatedAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    data: users[userIndex],
    message: 'User updated successfully'
  });
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  
  res.json({
    success: true,
    data: deletedUser,
    message: 'User deleted successfully'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Express demo server running on http://localhost:${PORT}`);
    console.log(`📋 Available endpoints:`);
    console.log(`   GET    /                  - React form demo`);
    console.log(`   GET    /api/health        - Health check`);
    console.log(`   GET    /api/users         - List all users`);
    console.log(`   POST   /api/users         - Create user`);
    console.log(`   GET    /api/users/:id     - Get user by ID`);
    console.log(`   PUT    /api/users/:id     - Update user`);
    console.log(`   DELETE /api/users/:id     - Delete user`);
    console.log(`\n💡 Try opening http://localhost:${PORT} in your browser`);
  });
}

module.exports = app;