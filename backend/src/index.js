const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { initDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const shopRoutes = require('./routes/shopRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Initialize database
initDB();

// Routes
app.use('/api', authRoutes);
app.use('/api', shopRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running correctly!', timestamp: new Date() });
});

// Root Route
app.get('/', (req, res) => {
  res.send('Ecommerce Cloud Native API is online');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
