const express = require('express');
const router = express.Router();
const { 
  createProduct, 
  getSellerProducts, 
  updateProduct, 
  deleteProduct,
  getAllProducts,
  getProductById
} = require('../controllers/productController');
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', getAllProducts);

// Protected routes require authentication
router.use(authenticateToken);

router.post('/', upload.single('image'), createProduct);
router.get('/seller', getSellerProducts);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

// Public route with parameter (put last to avoid hijacking other routes)
router.get('/:id', getProductById);

module.exports = router;
