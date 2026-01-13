# ⚛️ React Quick Study Guide & Cheatsheet  
*SparkNotes Style - Modern React with Hooks & ES Modules*

---

## 📋 Table of Contents
1. [Modern React Essentials](#-modern-react-essentials)
2. [Components & JSX](#-components--jsx)
3. [Hooks Deep Dive](#-hooks-deep-dive)
4. [State Management](#-state-management)
5. [Event Handling](#-event-handling)
6. [Performance Optimization](#-performance-optimization)
7. [Styling Patterns](#-styling-patterns)
8. [Common Patterns](#-common-patterns)
9. [Quick Commands](#-quick-commands)

---

## ⚛️ Modern React Essentials

### **ES Modules Setup**
```javascript
// ✅ Modern React imports
import React from 'react';                    // React core
import { useState, useEffect } from 'react';  // Named hooks
import { createRoot } from 'react-dom/client'; // React 18+

// ✅ Component imports/exports
import MyComponent from './MyComponent.jsx';   // Default import
import { Button, Modal } from './components'; // Named imports

// ✅ Component exports
export default MyComponent;                   // Default export
export { Button, Modal };                     // Named exports
export const utility = () => {};              // Utility export
```

### **⚡ Component Quick Start**
```jsx
// ✅ Functional component template
import React, { useState, useEffect } from 'react';

const MyComponent = ({ title, onAction }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Component mounted/updated');
  }, []);
  
  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};

export default MyComponent;
```

---

## 🧩 Components & JSX

### **JSX Essentials**
```jsx
// ✅ JSX basics
const element = <h1>Hello World</h1>;
const withVariables = <h1>Hello {name}</h1>;
const withExpressions = <h1>{user.name.toUpperCase()}</h1>;

// ✅ Conditional rendering
const conditional = (
  <div>
    {isLoggedIn ? <Dashboard /> : <Login />}
    {error && <ErrorMessage error={error} />}
    {items.length > 0 && <ItemList items={items} />}
  </div>
);

// ✅ Lists and keys
const listItems = items.map(item => (
  <li key={item.id}>{item.name}</li>
));

// ✅ Fragments
const fragment = (
  <>
    <Header />
    <Main />
    <Footer />
  </>
);
```

### **Component Patterns**
```jsx
// ✅ Props destructuring
const UserCard = ({ name, email, avatar, isActive = false }) => (
  <div className={`user-card ${isActive ? 'active' : ''}`}>
    <img src={avatar} alt={name} />
    <h3>{name}</h3>
    <p>{email}</p>
  </div>
);

// ✅ Children prop
const Container = ({ children, className = '' }) => (
  <div className={`container ${className}`}>
    {children}
  </div>
);

// ✅ Render props pattern
const DataFetcher = ({ render, url }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);
  
  return render({ data, loading });
};

// Usage: <DataFetcher url="/api/users" render={({data, loading}) => ...} />
```

---

## 🪝 Hooks Deep Dive

### **useState Patterns**
```jsx
// ✅ Basic state
const [count, setCount] = useState(0);
const [user, setUser] = useState(null);
const [items, setItems] = useState([]);

// ✅ Functional updates
setCount(prev => prev + 1);
setItems(prev => [...prev, newItem]);
setUser(prev => ({ ...prev, name: newName }));

// ✅ Multiple state values
const [state, setState] = useState({
  loading: false,
  data: null,
  error: null
});

// Update multiple values
setState(prev => ({
  ...prev,
  loading: false,
  data: responseData
}));
```

### **useEffect Patterns**
```jsx
// ✅ Component mount/unmount
useEffect(() => {
  console.log('Component mounted');
  
  return () => {
    console.log('Component will unmount');
  };
}, []); // Empty dependency array = mount only

// ✅ Watch specific values
useEffect(() => {
  console.log('Count changed:', count);
}, [count]); // Runs when count changes

// ✅ Async operations
useEffect(() => {
  let cancelled = false;
  
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      
      if (!cancelled) {
        setData(data);
      }
    } catch (error) {
      if (!cancelled) {
        setError(error);
      }
    }
  };
  
  fetchData();
  
  return () => {
    cancelled = true; // Cleanup to prevent state update on unmounted component
  };
}, []);
```

### **Custom Hooks**
```jsx
// ✅ API fetch hook
const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
};

// Usage
const UserProfile = ({ userId }) => {
  const { data: user, loading, error } = useApi(`/api/users/${userId}`);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{user?.name}</div>;
};

// ✅ Local storage hook
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setStoredValue = (value) => {
    try {
      setValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };
  
  return [value, setStoredValue];
};
```

---

## 🎛️ State Management

### **useReducer for Complex State**
```jsx
// ✅ Reducer pattern
const initialState = {
  items: [],
  loading: false,
  error: null
};

const itemsReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { 
        ...state, 
        items: state.items.filter(item => item.id !== action.payload) 
      };
    default:
      return state;
  }
};

const ItemManager = () => {
  const [state, dispatch] = useReducer(itemsReducer, initialState);
  
  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };
  
  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };
  
  return (
    <div>
      {state.loading && <div>Loading...</div>}
      {state.error && <div>Error: {state.error}</div>}
      <ItemList items={state.items} onRemove={removeItem} />
    </div>
  );
};
```

### **Context for Global State**
```jsx
// ✅ Create context
const AppContext = createContext();

// ✅ Provider component
const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  
  const login = async (credentials) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  const logout = () => {
    setUser(null);
  };
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  const value = {
    user,
    theme,
    login,
    logout,
    toggleTheme
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// ✅ Custom hook to use context
const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// ✅ Usage in component
const Header = () => {
  const { user, theme, logout, toggleTheme } = useApp();
  
  return (
    <header className={`header ${theme}`}>
      {user ? (
        <div>
          <span>Welcome, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <LoginButton />
      )}
      <button onClick={toggleTheme}>
        Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  );
};
```

---

## 🖱️ Event Handling

### **Event Patterns**
```jsx
// ✅ Basic event handling
const ButtonComponent = () => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Button clicked');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log('Form data:', data);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
};

// ✅ Controlled inputs
const FormComponent = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    age: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <form>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="age"
        type="number"
        value={values.age}
        onChange={handleChange}
        placeholder="Age"
      />
    </form>
  );
};
```

---

## ⚡ Performance Optimization

### **useMemo & useCallback**
```jsx
// ✅ useMemo for expensive calculations
const ExpensiveComponent = ({ items, filter }) => {
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item => item.name.includes(filter));
  }, [items, filter]);
  
  const stats = useMemo(() => ({
    total: items.length,
    filtered: filteredItems.length,
    percentage: (filteredItems.length / items.length) * 100
  }), [items, filteredItems]);
  
  return (
    <div>
      <p>Total: {stats.total} | Filtered: {stats.filtered}</p>
      <ItemList items={filteredItems} />
    </div>
  );
};

// ✅ useCallback for stable function references
const TodoList = ({ todos, onToggle, onDelete }) => {
  const [filter, setFilter] = useState('all');
  
  const handleToggle = useCallback((id) => {
    onToggle(id);
  }, [onToggle]);
  
  const handleDelete = useCallback((id) => {
    onDelete(id);
  }, [onDelete]);
  
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);
  
  return (
    <div>
      <FilterButtons filter={filter} onFilterChange={setFilter} />
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};
```

### **React.memo for Component Optimization**
```jsx
// ✅ Memoized component
const TodoItem = React.memo(({ todo, onToggle, onDelete }) => {
  console.log('TodoItem rendered:', todo.id);
  
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span>{todo.text}</span>
      <button onClick={() => onToggle(todo.id)}>Toggle</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
});

// ✅ Custom comparison function
const ExpensiveComponent = React.memo(({ user, settings }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <Settings settings={settings} />
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison - only re-render if user.name or settings changed
  return (
    prevProps.user.name === nextProps.user.name &&
    JSON.stringify(prevProps.settings) === JSON.stringify(nextProps.settings)
  );
});
```

---

## 🎨 Styling Patterns

### **CSS-in-JS & Inline Styles**
```jsx
// ✅ Inline styles with computed values
const StyledButton = ({ variant, size, disabled }) => {
  const baseStyles = {
    padding: size === 'large' ? '12px 24px' : '8px 16px',
    fontSize: size === 'large' ? '16px' : '14px',
    border: 'none',
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease'
  };
  
  const variantStyles = {
    primary: {
      background: '#3498db',
      color: 'white'
    },
    secondary: {
      background: '#ecf0f1',
      color: '#2c3e50'
    },
    danger: {
      background: '#e74c3c',
      color: 'white'
    }
  }[variant];
  
  const styles = { ...baseStyles, ...variantStyles };
  
  return (
    <button style={styles} disabled={disabled}>
      Button
    </button>
  );
};

// ✅ CSS classes with computed classNames
const Card = ({ children, elevated, clickable, className = '' }) => {
  const classes = [
    'card',
    elevated && 'card--elevated',
    clickable && 'card--clickable',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};
```

---

## 🔄 Common Patterns

### **Loading States**
```jsx
// ✅ Loading wrapper component
const AsyncWrapper = ({ children, loading, error, empty }) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error">
        <h3>Something went wrong</h3>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }
  
  if (empty) {
    return (
      <div className="empty">
        <p>No data available</p>
      </div>
    );
  }
  
  return children;
};

// Usage
const UsersList = () => {
  const { data: users, loading, error } = useApi('/api/users');
  
  return (
    <AsyncWrapper 
      loading={loading} 
      error={error} 
      empty={!users || users.length === 0}
    >
      <div className="users-list">
        {users?.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </AsyncWrapper>
  );
};
```

### **Portal Pattern**
```jsx
// ✅ Modal with portal
import { createPortal } from 'react-dom';

const Modal = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};
```

---

## ⚡ Quick Commands

### **Create React App (ES Modules)**
```bash
# Modern React setup
npx create-react-app my-app
cd my-app
npm start

# With TypeScript
npx create-react-app my-app --template typescript

# Vite (faster alternative)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

### **Essential Dev Dependencies**
```json
{
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^5.0.0"
  }
}
```

---

## 🎯 Quick Reference Summary

| **Category** | **Essential Pattern** |
|-------------|----------------------|
| **Component** | `const MyComponent = ({ props }) => { return <div>{props}</div>; }` |
| **State** | `const [state, setState] = useState(initialValue)` |
| **Effect** | `useEffect(() => { /* side effect */ }, [deps])` |
| **Event** | `const handleClick = (e) => { e.preventDefault(); }` |
| **Conditional** | `{condition && <Component />}` |
| **List** | `{items.map(item => <Item key={item.id} {...item} />)}` |
| **Memo** | `const value = useMemo(() => expensive(), [deps])` |
| **Callback** | `const fn = useCallback(() => {}, [deps])` |

---

**📖 Study Tips:**
- Master functional components and hooks first
- Always use keys in lists
- Optimize with useMemo/useCallback only when needed
- Keep components small and focused
- Use custom hooks for reusable logic

**⚡ Speed Learning Path:**
1. JSX & Components → 2. useState & useEffect → 3. Event handling → 4. Custom hooks → 5. Context API → 6. Performance optimization

---

*Updated: January 2026 | React 18+ with ES Modules*
