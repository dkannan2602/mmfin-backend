require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();

// Store MongoDB connection status
let mongoDbConnected = false;

// Connect to MongoDB (async, so handle with .catch())
connectDB()
  .then(() => {
    mongoDbConnected = true;
    console.log('✓ MongoDB Connected');
  })
  .catch(err => {
    console.error('✗ Failed to connect to MongoDB:', err);
    mongoDbConnected = false;
  });

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint - Deployment Status
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Madurai Meenakshi Finance Backend - Successfully Deployed',
    status: {
      server: {
        running: true,
        port: process.env.PORT || 5000,
        environment: process.env.NODE_ENV || 'production',
        timestamp: new Date().toISOString(),
        uptime: process.uptime().toFixed(2) + ' seconds'
      },
      database: {
        connected: mongoDbConnected,
        status: mongoDbConnected ? '✓ Connected' : '✗ Disconnected',
        uri: mongoDbConnected ? 'MongoDB' : 'Not available'
      }
    },
    api: {
      version: '1.0.0',
      endpoints: {
        auth: '/api/auth',
        contact: '/api/contact',
        quick: '/api/quick',
        settings: '/api/settings',
        health: '/api/health'
      }
    },
    deployment: {
      service: 'Vercel',
      timestamp: new Date().toISOString()
    }
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/quick', require('./routes/quick'));
app.use('/api/settings', require('./routes/settings'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method,
    availableEndpoints: {
      root: '/',
      health: '/api/health',
      auth: '/api/auth',
      contact: '/api/contact',
      quick: '/api/quick',
      settings: '/api/settings'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`✓ MongoDB Status: ${mongoDbConnected ? 'Connected' : 'Connecting...'}`);
  console.log(`========================================\n`);
});
