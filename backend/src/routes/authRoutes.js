const express = require('express');
const router = express.Router();
const { signup, login, getProfile, updateProfile, deleteAccount } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.delete('/profile', authenticateToken, deleteAccount);

module.exports = router;
