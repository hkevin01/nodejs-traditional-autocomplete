import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

// Kafka Real-time Dashboard Component
const KafkaDashboard = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  
  // Form states
  const [userEventForm, setUserEventForm] = useState({
    userId: 'user-123',
    eventType: 'USER_LOGIN',
    data: '{"ip": "192.168.1.1", "browser": "Chrome"}'
  });
  
  const [notificationForm, setNotificationForm] = useState({
    userId: 'user-123',
    title: 'System Alert',
    message: 'This is a test notification'
  });
  
  const [chatForm, setChatForm] = useState({
    userId: 'user-123',
    userName: 'John Doe',
    message: 'Hello everyone!',
    roomId: 'general'
  });
  
  const messagesEndRef = useRef(null);

  // Connect to WebSocket
  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('🔌 Connected to Kafka WebSocket');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('🔌 Disconnected from Kafka WebSocket');
    });

    newSocket.on('kafka-message', (data) => {
      console.log('📥 Kafka message received:', data);
      setMessages(prev => [...prev, {
        id: Date.now(),
        ...data,
        receivedAt: new Date()
      }]);
    });

    newSocket.on('user-notification', (notification) => {
      console.log('🔔 Notification received:', notification);
      setNotifications(prev => [...prev, {
        ...notification,
        receivedAt: new Date()
      }]);
    });

    newSocket.on('chat-general', (chatMessage) => {
      console.log('💬 Chat message received:', chatMessage);
      setChatMessages(prev => [...prev, {
        ...chatMessage,
        receivedAt: new Date()
      }]);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatMessages]);

  // API call function
  const sendToKafka = async (endpoint, data) => {
    try {
      const response = await fetch(`http://localhost:3001/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log(`✅ ${endpoint} sent successfully`);
      } else {
        console.error(`❌ Failed to send ${endpoint}:`, result.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  // Event handlers
  const handleUserEvent = async () => {
    try {
      const data = JSON.parse(userEventForm.data);
      await sendToKafka('events/user', {
        ...userEventForm,
        data
      });
    } catch (error) {
      console.error('Invalid JSON in data field:', error);
    }
  };

  const handleNotification = async () => {
    await sendToKafka('notifications', notificationForm);
  };

  const handleChatMessage = async () => {
    await sendToKafka('chat', chatForm);
    setChatForm(prev => ({ ...prev, message: '' })); // Clear message
  };

  const clearMessages = () => {
    setMessages([]);
    setNotifications([]);
    setChatMessages([]);
  };

  return (
    <div className="kafka-dashboard">
      <div className="header">
        <h1>⚡ Kafka Real-time Dashboard</h1>
        <div className="connection-status">
          Status: 
          <span className={isConnected ? 'connected' : 'disconnected'}>
            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </span>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* User Events Panel */}
        <div className="panel">
          <h3>👤 Send User Event</h3>
          <div className="form-group">
            <label>User ID:</label>
            <input
              type="text"
              value={userEventForm.userId}
              onChange={(e) => setUserEventForm(prev => ({
                ...prev, userId: e.target.value
              }))}
            />
          </div>
          <div className="form-group">
            <label>Event Type:</label>
            <select
              value={userEventForm.eventType}
              onChange={(e) => setUserEventForm(prev => ({
                ...prev, eventType: e.target.value
              }))}
            >
              <option value="USER_LOGIN">User Login</option>
              <option value="USER_LOGOUT">User Logout</option>
              <option value="USER_REGISTERED">User Registered</option>
              <option value="USER_UPDATED">User Updated</option>
              <option value="PAGE_VIEW">Page View</option>
            </select>
          </div>
          <div className="form-group">
            <label>Data (JSON):</label>
            <textarea
              value={userEventForm.data}
              onChange={(e) => setUserEventForm(prev => ({
                ...prev, data: e.target.value
              }))}
              rows={3}
            />
          </div>
          <button onClick={handleUserEvent}>🚀 Send User Event</button>
        </div>

        {/* Notifications Panel */}
        <div className="panel">
          <h3>🔔 Send Notification</h3>
          <div className="form-group">
            <label>User ID:</label>
            <input
              type="text"
              value={notificationForm.userId}
              onChange={(e) => setNotificationForm(prev => ({
                ...prev, userId: e.target.value
              }))}
            />
          </div>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={notificationForm.title}
              onChange={(e) => setNotificationForm(prev => ({
                ...prev, title: e.target.value
              }))}
            />
          </div>
          <div className="form-group">
            <label>Message:</label>
            <textarea
              value={notificationForm.message}
              onChange={(e) => setNotificationForm(prev => ({
                ...prev, message: e.target.value
              }))}
              rows={3}
            />
          </div>
          <button onClick={handleNotification}>📤 Send Notification</button>
        </div>

        {/* Chat Panel */}
        <div className="panel">
          <h3>💬 Send Chat Message</h3>
          <div className="form-group">
            <label>User ID:</label>
            <input
              type="text"
              value={chatForm.userId}
              onChange={(e) => setChatForm(prev => ({
                ...prev, userId: e.target.value
              }))}
            />
          </div>
          <div className="form-group">
            <label>User Name:</label>
            <input
              type="text"
              value={chatForm.userName}
              onChange={(e) => setChatForm(prev => ({
                ...prev, userName: e.target.value
              }))}
            />
          </div>
          <div className="form-group">
            <label>Room ID:</label>
            <input
              type="text"
              value={chatForm.roomId}
              onChange={(e) => setChatForm(prev => ({
                ...prev, roomId: e.target.value
              }))}
            />
          </div>
          <div className="form-group">
            <label>Message:</label>
            <input
              type="text"
              value={chatForm.message}
              onChange={(e) => setChatForm(prev => ({
                ...prev, message: e.target.value
              }))}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleChatMessage();
                }
              }}
            />
          </div>
          <button onClick={handleChatMessage}>💬 Send Message</button>
        </div>

        {/* Messages Display */}
        <div className="panel full-width">
          <div className="panel-header">
            <h3>📥 Real-time Kafka Messages</h3>
            <button onClick={clearMessages} className="clear-btn">
              🗑️ Clear All
            </button>
          </div>
          
          <div className="messages-container">
            <div className="messages-section">
              <h4>📧 All Kafka Messages ({messages.length})</h4>
              <div className="messages-list">
                {messages.map(msg => (
                  <div key={msg.id} className="message-item kafka-message">
                    <div className="message-header">
                      <span className="topic">{msg.topic}</span>
                      <span className="timestamp">
                        {msg.receivedAt.toLocaleTimeString()}
                      </span>
                    </div>
                    <pre>{JSON.stringify(msg.data, null, 2)}</pre>
                  </div>
                ))}
              </div>
            </div>

            <div className="messages-section">
              <h4>🔔 Notifications ({notifications.length})</h4>
              <div className="messages-list">
                {notifications.map(notif => (
                  <div key={notif.id} className="message-item notification">
                    <div className="message-header">
                      <span className="title">{notif.title}</span>
                      <span className="timestamp">
                        {notif.receivedAt.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="message-content">{notif.message}</div>
                    <div className="user-id">User: {notif.userId}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="messages-section">
              <h4>💬 Chat Messages ({chatMessages.length})</h4>
              <div className="messages-list">
                {chatMessages.map(chat => (
                  <div key={chat.id} className="message-item chat-message">
                    <div className="message-header">
                      <span className="username">{chat.userName}</span>
                      <span className="room">#{chat.roomId}</span>
                      <span className="timestamp">
                        {chat.receivedAt.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="message-content">{chat.message}</div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KafkaDashboard;