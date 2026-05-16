const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { JWT_SECRET } = require('../middleware/auth');

const signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required, including role' });
  }

  if (!['buyer', 'salesperson'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role selected' });
  }

  try {
    const existingEmail = await User.findByEmail(email);
    const existingUsername = await User.findByUsername(username);

    if (existingEmail || existingUsername) {
      return res.status(400).json({ error: 'User with this email or username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userId = await User.create(username, email, hashedPassword, role);

    // Auto-login after signup
    const token = jwt.sign({ id: userId, username, role }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true }).status(201).json({
      message: 'User registered and logged in successfully!',
      token,
      user: { id: userId, username, email, role }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true }).json({
      message: 'Logged in successfully!',
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { signup, login, getProfile };
