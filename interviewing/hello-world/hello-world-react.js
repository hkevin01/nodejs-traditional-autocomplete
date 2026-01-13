// ⚛️ React Hello World Patterns for Code Runner
// Right-click → "Run Code" or press Ctrl+Alt+N
// Learn React concepts with execution! ✨

// 1. Basic Component Structure (Simulated)
function HelloWorld(props) {
  return {
    type: 'div',
    props: {
      className: 'hello-world',
      children: `Hello, ${props.name || 'World'}! 👋`
    }
  };
}

const component1 = HelloWorld({ name: 'React Developer' });
console.log('🎨 Basic Component:', component1);

// 2. State Management Pattern
function useState(initialValue) {
  let value = initialValue;
  
  const setValue = (newValue) => {
    value = newValue;
    console.log(`📊 State updated: ${value}`);
    return value;
  };
  
  const getValue = () => value;
  
  return [getValue, setValue];
}

// Simulate React state
const [getCount, setCount] = useState(0);
console.log('🔢 Initial count:', getCount());

setCount(1);
setCount(getCount() + 1);
setCount(getCount() + 1);
console.log('🎯 Final count:', getCount());

// 3. Form Handling Pattern
const formState = {
  name: '',
  email: '',
  message: ''
};

function handleInputChange(field, value) {
  formState[field] = value;
  console.log(`✏️ Form updated - ${field}: ${value}`);
  return { ...formState }; // React pattern: return new object
}

function validateForm(data) {
  const errors = {};
  
  if (!data.name.trim()) errors.name = 'Name is required';
  if (!data.email.includes('@')) errors.email = 'Invalid email';
  if (data.message.length < 5) errors.message = 'Message too short';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Simulate user input
const updatedForm1 = handleInputChange('name', 'Alice');
const updatedForm2 = handleInputChange('email', 'alice@example.com');
const updatedForm3 = handleInputChange('message', 'Hello from React!');

const validation = validateForm(formState);
console.log('✅ Form validation:', validation);

// 4. Component Props and Children
function Card(props) {
  return {
    type: 'div',
    props: {
      className: 'card',
      style: { padding: '16px', border: '1px solid #ccc' },
      children: [
        {
          type: 'h3',
          props: { children: props.title }
        },
        {
          type: 'p',
          props: { children: props.content }
        },
        ...(props.children || [])
      ]
    }
  };
}

const cardComponent = Card({
  title: '🎉 Welcome Card',
  content: 'This is a card component demo!',
  children: [
    {
      type: 'button',
      props: { children: 'Click me!' }
    }
  ]
});

console.log('🎴 Card Component:', cardComponent);

// 5. List Rendering Pattern
const todos = [
  { id: 1, text: 'Learn React', completed: true },
  { id: 2, text: 'Try Code Runner', completed: true },
  { id: 3, text: 'Build something awesome', completed: false }
];

function TodoList(items) {
  return {
    type: 'ul',
    props: {
      className: 'todo-list',
      children: items.map(item => ({
        type: 'li',
        key: item.id,
        props: {
          className: item.completed ? 'completed' : 'pending',
          children: `${item.completed ? '✅' : '⭕'} ${item.text}`
        }
      }))
    }
  };
}

const todoComponent = TodoList(todos);
console.log('📋 Todo List:', todoComponent);

// 6. Event Handlers Simulation
const eventHandlers = {
  onClick: (buttonName) => {
    console.log(`🖱️ Button clicked: ${buttonName}`);
    return { event: 'click', target: buttonName, timestamp: Date.now() };
  },
  
  onSubmit: (formData) => {
    console.log(`📤 Form submitted:`, formData);
    return { event: 'submit', data: formData, success: true };
  },
  
  onChange: (field, value) => {
    console.log(`🔄 Input changed: ${field} = ${value}`);
    return { event: 'change', field, value, timestamp: Date.now() };
  }
};

// Simulate events
const clickResult = eventHandlers.onClick('Submit Button');
const changeResult = eventHandlers.onChange('username', 'alice123');
const submitResult = eventHandlers.onSubmit(formState);

console.log('🎮 Event Results:');
console.log('Click:', clickResult);
console.log('Change:', changeResult);
console.log('Submit:', submitResult);

// 7. Conditional Rendering
function WelcomeMessage(isLoggedIn, username) {
  if (isLoggedIn) {
    return {
      type: 'div',
      props: {
        className: 'welcome',
        children: `👤 Welcome back, ${username}!`
      }
    };
  } else {
    return {
      type: 'div',
      props: {
        className: 'login-prompt',
        children: '🔐 Please log in to continue'
      }
    };
  }
}

const loggedInComponent = WelcomeMessage(true, 'Alice');
const loggedOutComponent = WelcomeMessage(false);

console.log('👤 Logged in view:', loggedInComponent);
console.log('🔐 Logged out view:', loggedOutComponent);

// 8. Component Composition
function App() {
  return {
    type: 'div',
    props: {
      className: 'app',
      children: [
        HelloWorld({ name: 'Code Runner User' }),
        cardComponent,
        todoComponent,
        WelcomeMessage(true, 'React Developer')
      ]
    }
  };
}

const appComponent = App();
console.log('🚀 Complete App:', appComponent);

// Try modifying any values above and re-run to see React pattern demonstrations!
// This shows React concepts without needing the actual React library! 🎯