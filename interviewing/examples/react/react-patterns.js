// React Patterns in Quokka.js
// Start Quokka: Ctrl+Shift+P -> "Quokka.js: Start on Current File"
// These are React concepts demonstrated with plain JavaScript

// 1. Component State Pattern (simulated)
function createState(initialValue) {
  let value = initialValue;
  const listeners = [];
  
  return {
    get: () => value,
    set: (newValue) => {
      value = newValue;
      listeners.forEach(listener => listener(value));
    },
    subscribe: (listener) => listeners.push(listener)
  };
}

const nameState = createState('John Doe');
console.log('📝 Initial name:', nameState.get());

nameState.set('Jane Smith');
console.log('📝 Updated name:', nameState.get());

// 2. Form Data Pattern
const formData = {
  name: '',
  email: '',
  phone: '',
  address: ''
};

function updateFormField(field, value) {
  formData[field] = value;
  return { ...formData }; // Return new object (React pattern)
}

const updatedForm = updateFormField('name', 'Alice Johnson');
console.log('📋 Form after name update:', updatedForm);

const finalForm = updateFormField('email', 'alice@example.com');
console.log('📋 Form after email update:', finalForm);

// 3. Validation Pattern
function validateForm(data) {
  const errors = {};
  
  if (!data.name?.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (!data.phone?.trim()) {
    errors.phone = 'Phone is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

const validationResult = validateForm(finalForm);
console.log('✅ Validation result:', validationResult);

// 4. Event Handler Patterns
const eventHandlers = {
  handleInputChange: (field, value) => {
    console.log(`🎯 Input changed: ${field} = ${value}`);
    return updateFormField(field, value);
  },
  
  handleSubmit: (data) => {
    console.log('🚀 Form submitted:', data);
    const validation = validateForm(data);
    
    if (validation.isValid) {
      console.log('✅ Form is valid, submitting...');
      return { success: true, id: Math.floor(Math.random() * 1000) };
    } else {
      console.log('❌ Form has errors:', validation.errors);
      return { success: false, errors: validation.errors };
    }
  }
};

// Simulate form interaction
let currentForm = { name: '', email: '', phone: '', address: '' };

currentForm = eventHandlers.handleInputChange('name', 'Bob Wilson');
currentForm = eventHandlers.handleInputChange('email', 'bob@test.com');
currentForm = eventHandlers.handleInputChange('phone', '555-0123');
currentForm = eventHandlers.handleInputChange('address', '123 Main St');

const submitResult = eventHandlers.handleSubmit(currentForm);
console.log('📤 Submit result:', submitResult);

// 5. Component Props Pattern (simulated)
function UserCard(props) {
  return {
    render: () => {
      return {
        type: 'div',
        className: 'user-card',
        children: [
          { type: 'h2', text: props.name },
          { type: 'p', text: `Email: ${props.email}` },
          { type: 'p', text: `Phone: ${props.phone}` },
          { type: 'p', text: `Address: ${props.address}` }
        ]
      };
    }
  };
}

const userCardComponent = UserCard(currentForm);
const renderedCard = userCardComponent.render();
console.log('🎴 Rendered User Card:', renderedCard);

// 6. List Rendering Pattern
const users = [
  { id: 1, name: 'Alice', email: 'alice@test.com' },
  { id: 2, name: 'Bob', email: 'bob@test.com' },
  { id: 3, name: 'Charlie', email: 'charlie@test.com' }
];

function UserList(userArray) {
  return userArray.map(user => ({
    id: user.id,
    component: UserCard(user).render()
  }));
}

const userListRendered = UserList(users);
console.log('📋 User List:', userListRendered);

// 7. Conditional Rendering Pattern
function ConditionalMessage(isLoggedIn, userName) {
  if (isLoggedIn) {
    return { type: 'div', text: `Welcome back, ${userName}!` };
  } else {
    return { type: 'div', text: 'Please log in to continue.' };
  }
}

const loggedInMessage = ConditionalMessage(true, 'Alice');
const loggedOutMessage = ConditionalMessage(false);

console.log('👤 Logged in:', loggedInMessage);
console.log('🚫 Logged out:', loggedOutMessage);

// Try modifying any values above and see instant feedback!
// This demonstrates React patterns without any framework overhead