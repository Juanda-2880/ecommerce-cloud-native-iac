const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getCart, 
  addToCart, 
  removeFromCart, 
  processCheckout 
} = require('../controllers/shopController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/products', getProducts);

// Protected routes (require login)
router.get('/cart', protect, getCart);
router.post('/cart', protect, addToCart);
router.delete('/cart/:cartItemId', protect, removeFromCart);
router.post('/checkout', protect, processCheckout);

module.exports = router;
