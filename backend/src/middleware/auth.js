const jwt = require('jsonwebtoken');

const getJwtSecret = () => (process.env.JWT_SECRET || 'your_fallback_secret_key_123').trim();

const authenticateToken = (req, res, next) => {
  const secret = getJwtSecret();
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    console.log('Auth Failure: No token provided');
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    console.log('Token received (first 20 chars):', token.substring(0, 20));
    console.log('Secret Status:', secret === 'your_fallback_secret_key_123' ? 'FALLBACK' : 'ENV_LOADED');
    res.status(400).json({ error: 'Invalid token', details: err.message });
  }
};

module.exports = { authenticateToken, getJwtSecret };
