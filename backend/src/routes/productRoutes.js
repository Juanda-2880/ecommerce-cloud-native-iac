const express = require('express');
const router = express.Router();
const { 
  createProduct, 
  getSellerProducts, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const { authenticateToken } = require('../middleware/auth');

// All product routes require authentication
router.use(authenticateToken);

router.post('/', createProduct);
router.get('/seller', getSellerProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
