const express = require('express');
const router = express.Router();
const { createPreference, handleWebhook } = require('../controllers/paymentController');
const { authenticateToken } = require('../middleware/auth');

router.post('/create_preference', authenticateToken, createPreference);
router.post('/webhook', handleWebhook);

module.exports = router;
