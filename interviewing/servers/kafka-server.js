const kafka = require('kafkajs');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Kafka Configuration
const kafkaConfig = {
  clientId: 'nodejs-kafka-app',
  brokers: ['localhost:9092'], // Default Kafka broker
  retry: {
    initialRetryTime: 100,
    retries: 8
  }
};

const kafka_client = kafka(kafkaConfig);
const producer = kafka_client.producer();
const consumer = kafka_client.consumer({ groupId: 'react-group' });

// Topics
const TOPICS = {
  USER_EVENTS: 'user-events',
  NOTIFICATIONS: 'notifications',
  CHAT_MESSAGES: 'chat-messages'
};

// Express app setup
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Kafka Producer Functions
class KafkaProducerService {
  constructor() {
    this.isConnected = false;
  }

  async connect() {
    try {
      await producer.connect();
      this.isConnected = true;
      console.log('✅ Kafka Producer connected');
    } catch (error) {
      console.error('❌ Failed to connect Kafka Producer:', error);
    }
  }

  async sendMessage(topic, message) {
    if (!this.isConnected) {
      await this.connect();
    }

    try {
      const result = await producer.send({
        topic,
        messages: [{
          partition: 0,
          key: message.id || Date.now().toString(),
          value: JSON.stringify(message),
          timestamp: Date.now()
        }]
      });
      
      console.log(`📤 Message sent to ${topic}:`, message);
      return result;
    } catch (error) {
      console.error('❌ Failed to send message:', error);
      throw error;
    }
  }

  async sendUserEvent(userId, eventType, data) {
    const message = {
      id: `user-${userId}-${Date.now()}`,
      userId,
      eventType,
      data,
      timestamp: new Date().toISOString()
    };
    
    return await this.sendMessage(TOPICS.USER_EVENTS, message);
  }

  async sendNotification(userId, title, message) {
    const notification = {
      id: `notif-${Date.now()}`,
      userId,
      title,
      message,
      type: 'info',
      timestamp: new Date().toISOString()
    };
    
    return await this.sendMessage(TOPICS.NOTIFICATIONS, notification);
  }

  async sendChatMessage(userId, userName, message, roomId = 'general') {
    const chatMessage = {
      id: `msg-${Date.now()}`,
      userId,
      userName,
      message,
      roomId,
      timestamp: new Date().toISOString()
    };
    
    return await this.sendMessage(TOPICS.CHAT_MESSAGES, chatMessage);
  }
}

// Kafka Consumer Service
class KafkaConsumerService {
  constructor() {
    this.isConnected = false;
  }

  async connect() {
    try {
      await consumer.connect();
      await consumer.subscribe({ 
        topics: Object.values(TOPICS),
        fromBeginning: false 
      });
      this.isConnected = true;
      console.log('✅ Kafka Consumer connected');
    } catch (error) {
      console.error('❌ Failed to connect Kafka Consumer:', error);
    }
  }

  async startConsuming() {
    if (!this.isConnected) {
      await this.connect();
    }

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const value = JSON.parse(message.value.toString());
          console.log(`📥 Received from ${topic}:`, value);
          
          // Emit to all connected React clients via WebSocket
          io.emit('kafka-message', {
            topic,
            data: value,
            partition,
            offset: message.offset,
            timestamp: new Date(parseInt(message.timestamp))
          });
          
          // Handle different message types
          switch (topic) {
            case TOPICS.USER_EVENTS:
              await this.handleUserEvent(value);
              break;
            case TOPICS.NOTIFICATIONS:
              await this.handleNotification(value);
              break;
            case TOPICS.CHAT_MESSAGES:
              await this.handleChatMessage(value);
              break;
          }
        } catch (error) {
          console.error('Error processing message:', error);
        }
      }
    });
  }

  async handleUserEvent(event) {
    console.log(`👤 User Event: ${event.eventType} for user ${event.userId}`);
    
    // Example: Send notification when user registers
    if (event.eventType === 'USER_REGISTERED') {
      const producerService = new KafkaProducerService();
      await producerService.sendNotification(
        event.userId,
        'Welcome!',
        'Welcome to our platform. Your account has been created successfully.'
      );
    }
  }

  async handleNotification(notification) {
    console.log(`🔔 Notification for user ${notification.userId}: ${notification.title}`);
    
    // Send notification to specific user via WebSocket
    io.emit('user-notification', notification);
  }

  async handleChatMessage(chatMessage) {
    console.log(`💬 Chat message in ${chatMessage.roomId}: ${chatMessage.message}`);
    
    // Broadcast chat message to room
    io.emit(`chat-${chatMessage.roomId}`, chatMessage);
  }
}

// Initialize services
const producerService = new KafkaProducerService();
const consumerService = new KafkaConsumerService();

// API Endpoints

// Send user event
app.post('/api/events/user', async (req, res) => {
  try {
    const { userId, eventType, data } = req.body;
    
    if (!userId || !eventType) {
      return res.status(400).json({
        success: false,
        error: 'userId and eventType are required'
      });
    }
    
    await producerService.sendUserEvent(userId, eventType, data);
    
    res.json({
      success: true,
      message: 'User event sent to Kafka'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Send notification
app.post('/api/notifications', async (req, res) => {
  try {
    const { userId, title, message } = req.body;
    
    if (!userId || !title || !message) {
      return res.status(400).json({
        success: false,
        error: 'userId, title, and message are required'
      });
    }
    
    await producerService.sendNotification(userId, title, message);
    
    res.json({
      success: true,
      message: 'Notification sent to Kafka'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Send chat message
app.post('/api/chat', async (req, res) => {
  try {
    const { userId, userName, message, roomId } = req.body;
    
    if (!userId || !userName || !message) {
      return res.status(400).json({
        success: false,
        error: 'userId, userName, and message are required'
      });
    }
    
    await producerService.sendChatMessage(userId, userName, message, roomId);
    
    res.json({
      success: true,
      message: 'Chat message sent to Kafka'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    kafka: {
      producer: producerService.isConnected,
      consumer: consumerService.isConnected
    },
    timestamp: new Date().toISOString()
  });
});

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
  
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`👥 Client ${socket.id} joined room ${roomId}`);
  });
});

// Start server and Kafka services
async function startServer() {
  try {
    // Connect Kafka services
    await producerService.connect();
    await consumerService.startConsuming();
    
    // Start Express server
    const PORT = process.env.PORT || 3001;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log('📡 WebSocket server ready');
      console.log('⚡ Kafka services connected and running');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await producer.disconnect();
  await consumer.disconnect();
  process.exit(0);
});

// Export for use
module.exports = {
  producerService,
  consumerService,
  startServer
};

// Start the server if this file is run directly
if (require.main === module) {
  startServer();
}