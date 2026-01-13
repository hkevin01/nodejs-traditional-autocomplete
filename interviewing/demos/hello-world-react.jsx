/**
 * 🚀 React Hello World - ES Modules Demo
 * 
 * This demonstrates modern React development with functional components,
 * hooks, and ES Modules syntax.
 * 
 * Features:
 * - Functional Components with Hooks
 * - ES Modules imports/exports
 * - Modern React patterns
 * - TypeScript-ready structure
 * 
 * Run with: npm run demo:react
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * 🎯 Modern React Component with Hooks
 */
const HelloWorldReact = () => {
  // 🎲 State Management
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Hello from React ES Modules!');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  // 📊 Computed Values (useMemo)
  const stats = useMemo(() => ({
    doubleCount: count * 2,
    isEven: count % 2 === 0,
    messageLength: message.length,
    timestamp: new Date().toISOString()
  }), [count, message]);

  // 🔄 Async Operation (useCallback)
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData({
        id: Date.now(),
        value: Math.random() * 100,
        source: 'Mock API',
        features: [
          'Functional Components',
          'React Hooks',
          'ES Modules',
          'Modern Async Patterns'
        ]
      });
    } catch (error) {
      console.error('Data fetch failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 🎯 Lifecycle Effects
  useEffect(() => {
    console.log('🎯 Component mounted with ES Modules!');
    fetchData();
    
    // Cleanup function
    return () => {
      console.log('🧹 Component cleanup');
    };
  }, [fetchData]);

  // 📝 Event Handlers
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const handleDecrement = useCallback(() => {
    setCount(prev => Math.max(0, prev - 1));
  }, []);

  const handleReset = useCallback(() => {
    setCount(0);
    setMessage('Hello from React ES Modules!');
  }, []);

  const handleMessageChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  // 🎨 Render Component
  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '12px',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }}>
      {/* Header */}
      <header style={{ textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          margin: '0 0 0.5rem 0',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)' 
        }}>
          🚀 React ES Modules Demo
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          opacity: 0.9, 
          margin: 0 
        }}>
          Modern React with Functional Components & Hooks
        </p>
      </header>

      {/* Interactive Message */}
      <section style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '1.5rem',
        borderRadius: '8px',
        backdropFilter: 'blur(10px)'
      }}>
        <h2>💬 Interactive Message</h2>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            borderRadius: '6px',
            border: 'none',
            marginBottom: '1rem',
            background: 'rgba(255,255,255,0.9)',
            color: '#333'
          }}
          placeholder="Enter your message..."
        />
        <div style={{ 
          fontSize: '1.2rem', 
          fontWeight: 'bold',
          textAlign: 'center',
          padding: '1rem',
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '6px'
        }}>
          {message}
        </div>
      </section>

      {/* Counter */}
      <section style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '1.5rem',
        borderRadius: '8px',
        backdropFilter: 'blur(10px)'
      }}>
        <h2>🔢 Interactive Counter</h2>
        <div style={{ 
          textAlign: 'center',
          fontSize: '3rem',
          fontWeight: 'bold',
          margin: '1rem 0'
        }}>
          {count}
        </div>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleDecrement}
            style={buttonStyle}
          >
            ➖ Decrease
          </button>
          <button
            onClick={handleIncrement}
            style={buttonStyle}
          >
            ➕ Increase
          </button>
          <button
            onClick={handleReset}
            style={{ ...buttonStyle, background: '#e74c3c' }}
          >
            🔄 Reset
          </button>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '1.5rem',
        borderRadius: '8px',
        backdropFilter: 'blur(10px)'
      }}>
        <h2>📊 Live Statistics</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem'
        }}>
          <div style={statStyle}>
            <strong>Double Count:</strong><br/>
            {stats.doubleCount}
          </div>
          <div style={statStyle}>
            <strong>Is Even:</strong><br/>
            {stats.isEven ? '✅ Yes' : '❌ No'}
          </div>
          <div style={statStyle}>
            <strong>Message Length:</strong><br/>
            {stats.messageLength} chars
          </div>
        </div>
      </section>

      {/* Async Data */}
      <section style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '1.5rem',
        borderRadius: '8px',
        backdropFilter: 'blur(10px)'
      }}>
        <h2>🔄 Async Data Loading</h2>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{
              animation: 'spin 1s linear infinite',
              fontSize: '2rem',
              display: 'inline-block'
            }}>⭐</div>
            <p>Loading data...</p>
          </div>
        ) : data ? (
          <div>
            <p><strong>ID:</strong> {data.id}</p>
            <p><strong>Value:</strong> {data.value.toFixed(2)}</p>
            <p><strong>Source:</strong> {data.source}</p>
            <div>
              <strong>Features:</strong>
              <ul style={{ marginTop: '0.5rem' }}>
                {data.features.map((feature, index) => (
                  <li key={index}>✅ {feature}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={fetchData}
              style={buttonStyle}
            >
              🔄 Refresh Data
            </button>
          </div>
        ) : (
          <p>No data loaded</p>
        )}
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '1rem',
        opacity: 0.8,
        fontSize: '0.9rem'
      }}>
        <p>🎯 Modern React Demo • ES Modules • Functional Components • Hooks</p>
        <p>Updated: {new Date().toLocaleString()}</p>
      </footer>

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// 🎨 Reusable Styles
const buttonStyle = {
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '6px',
  background: '#3498db',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  minWidth: '120px'
};

const statStyle = {
  background: 'rgba(255,255,255,0.15)',
  padding: '1rem',
  borderRadius: '6px',
  textAlign: 'center',
  fontSize: '0.9rem'
};

/**
 * 📦 Export Components for ES Modules
 */
export { HelloWorldReact };
export default HelloWorldReact;

/**
 * 🚀 Demo App Wrapper (for standalone execution)
 */
export const App = () => (
  <div>
    <HelloWorldReact />
  </div>
);

/**
 * �� Component Usage Examples:
 * 
 * // Basic Import
 * import HelloWorldReact from './hello-world-react.jsx';
 * 
 * // Named Import
 * import { HelloWorldReact, App } from './hello-world-react.jsx';
 * 
 * // Usage in JSX
 * <HelloWorldReact />
 * 
 * // Full App
 * <App />
 */
