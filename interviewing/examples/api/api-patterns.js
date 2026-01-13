// API Patterns with Code Runner
// Right-click: "Run Code" or Ctrl+Alt+N
// Learn API concepts with instant feedback!

// 1. HTTP Methods Simulation
const httpMethods = {
  GET: (url, id) => {
    console.log(`📥 GET ${url}${id ? `/${id}` : ''}`);
    return { method: 'GET', url, id, timestamp: Date.now() };
  },
  
  POST: (url, data) => {
    console.log(`📤 POST ${url}`, data);
    return { method: 'POST', url, data, id: Math.floor(Math.random() * 1000) };
  },
  
  PUT: (url, id, data) => {
    console.log(`📝 PUT ${url}/${id}`, data);
    return { method: 'PUT', url, id, data, updated: true };
  },
  
  DELETE: (url, id) => {
    console.log(`🗑️  DELETE ${url}/${id}`);
    return { method: 'DELETE', url, id, deleted: true };
  }
};

// Test HTTP methods
const getResponse = httpMethods.GET('/api/users');
const postResponse = httpMethods.POST('/api/users', { name: 'John', email: 'john@test.com' });
const putResponse = httpMethods.PUT('/api/users', 123, { name: 'John Updated' });
const deleteResponse = httpMethods.DELETE('/api/users', 123);

console.log('🌐 API Responses:');
console.log('GET:', getResponse);
console.log('POST:', postResponse);
console.log('PUT:', putResponse);
console.log('DELETE:', deleteResponse);

// 2. RESTful Resource Pattern
class UserResource {
  constructor() {
    this.users = [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '555-0001' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '555-0002' },
      { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '555-0003' }
    ];
    this.nextId = 4;
  }
  
  // GET /users
  getAll() {
    return {
      success: true,
      data: this.users,
      count: this.users.length
    };
  }
  
  // GET /users/:id
  getById(id) {
    const user = this.users.find(u => u.id === parseInt(id));
    if (!user) {
      return { success: false, error: 'User not found', status: 404 };
    }
    return { success: true, data: user };
  }
  
  // POST /users
  create(userData) {
    const errors = this.validate(userData);
    if (errors.length > 0) {
      return { success: false, errors, status: 400 };
    }
    
    const newUser = {
      id: this.nextId++,
      ...userData,
      createdAt: new Date().toISOString()
    };
    
    this.users.push(newUser);
    return { success: true, data: newUser, status: 201 };
  }
  
  // PUT /users/:id
  update(id, userData) {
    const userIndex = this.users.findIndex(u => u.id === parseInt(id));
    if (userIndex === -1) {
      return { success: false, error: 'User not found', status: 404 };
    }
    
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...userData,
      updatedAt: new Date().toISOString()
    };
    
    return { success: true, data: this.users[userIndex] };
  }
  
  // DELETE /users/:id
  delete(id) {
    const userIndex = this.users.findIndex(u => u.id === parseInt(id));
    if (userIndex === -1) {
      return { success: false, error: 'User not found', status: 404 };
    }
    
    const deletedUser = this.users.splice(userIndex, 1)[0];
    return { success: true, data: deletedUser };
  }
  
  // Validation helper
  validate(userData) {
    const errors = [];
    if (!userData.name?.trim()) errors.push('Name is required');
    if (!userData.email?.trim()) errors.push('Email is required');
    if (userData.email && !/\S+@\S+\.\S+/.test(userData.email)) {
      errors.push('Invalid email format');
    }
    return errors;
  }
}

// Test the RESTful API
const userAPI = new UserResource();

console.log('\n📋 Testing RESTful API:');

// Get all users
const allUsers = userAPI.getAll();
console.log('GET /users:', allUsers);

// Get specific user
const user1 = userAPI.getById(1);
const userNotFound = userAPI.getById(999);
console.log('GET /users/1:', user1);
console.log('GET /users/999:', userNotFound);

// Create new user
const newUser = userAPI.create({
  name: 'David Wilson',
  email: 'david@example.com',
  phone: '555-0004'
});
console.log('POST /users:', newUser);

// Create user with validation errors
const invalidUser = userAPI.create({
  name: '',
  email: 'invalid-email'
});
console.log('POST /users (invalid):', invalidUser);

// Update user
const updatedUser = userAPI.update(1, {
  name: 'Alice Johnson Updated',
  phone: '555-9999'
});
console.log('PUT /users/1:', updatedUser);

// Delete user
const deletedUser = userAPI.delete(2);
console.log('DELETE /users/2:', deletedUser);

// Check final state
const finalUsers = userAPI.getAll();
console.log('Final users:', finalUsers);

// 3. Request/Response Patterns
function createResponse(data, status = 200, message = 'Success') {
  return {
    status,
    message,
    data,
    timestamp: new Date().toISOString(),
    requestId: Math.random().toString(36).substring(7)
  };
}

function createErrorResponse(error, status = 500) {
  return {
    status,
    error: error.message || error,
    timestamp: new Date().toISOString(),
    requestId: Math.random().toString(36).substring(7)
  };
}

const successResponse = createResponse({ id: 1, name: 'Test' }, 200, 'User created');
const errorResponse = createErrorResponse('Validation failed', 400);

console.log('\n📡 Response Patterns:');
console.log('Success:', successResponse);
console.log('Error:', errorResponse);

// 4. Middleware Pattern
const middleware = {
  logger: (req, res, next) => {
    console.log(`🕐 ${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  },
  
  auth: (req, res, next) => {
    if (req.headers?.authorization) {
      console.log('🔐 Auth: Valid token');
      req.user = { id: 1, name: 'Authenticated User' };
      next();
    } else {
      console.log('❌ Auth: No token provided');
      res.status = 401;
      res.error = 'Unauthorized';
    }
  },
  
  validation: (req, res, next) => {
    if (req.body && typeof req.body === 'object') {
      console.log('✅ Validation: Request body is valid');
      next();
    } else {
      console.log('❌ Validation: Invalid request body');
      res.status = 400;
      res.error = 'Invalid request body';
    }
  }
};

// Simulate middleware chain
function runMiddleware(middlewares, req, res) {
  let index = 0;
  
  function next() {
    if (index < middlewares.length) {
      const middleware = middlewares[index++];
      middleware(req, res, next);
    }
  }
  
  next();
  return res;
}

const testReq = {
  method: 'POST',
  url: '/api/users',
  headers: { authorization: 'Bearer token123' },
  body: { name: 'Test User', email: 'test@example.com' }
};

const testRes = {};

console.log('\n⚙️  Testing Middleware:');
runMiddleware([middleware.logger, middleware.auth, middleware.validation], testReq, testRes);
console.log('Final response:', testRes);

// Try modifying any values and see the results update instantly!
// This shows API patterns without running a real server