const express = require('express');
const router = express.Router();
const { createOrder, getOrderHistory } = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.post('/', createOrder);
router.get('/history', getOrderHistory);

module.exports = router;
