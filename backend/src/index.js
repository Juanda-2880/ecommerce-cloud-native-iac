const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

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
