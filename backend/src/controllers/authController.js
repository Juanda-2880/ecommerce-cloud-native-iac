const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Buyer, Salesperson, sequelize } = require('../models');
const { getJwtSecret } = require('../middleware/auth');

const signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required, including role' });
  }

  if (!['buyer', 'salesperson'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role selected' });
  }

  const t = await sequelize.transaction();

  try {
    const existingUser = await User.findOne({
      where: {
        [sequelize.Sequelize.Op.or]: [{ email }, { username }]
      }
    });

    if (existingUser) {
      await t.rollback();
      return res.status(400).json({ error: 'User with this email or username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role
    }, { transaction: t });

    if (role === 'salesperson') {
      await Salesperson.create({ user_id: user.id }, { transaction: t });
    } else {
      await Buyer.create({ user_id: user.id }, { transaction: t });
    }

    await t.commit();

    // Auto-login after signup
    const token = jwt.sign({ id: user.id, username, role }, getJwtSecret(), { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true }).status(201).json({
      message: 'User registered and logged in successfully!',
      token,
      user: { id: user.id, username, email, role }
    });
  } catch (err) {
    await t.rollback();
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
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, getJwtSecret(), { expiresIn: '1h' });

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
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'email', 'role']
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProfile = async (req, res) => {
  const { username, email, oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if new email/username is already taken by another user
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) return res.status(400).json({ error: 'Email already in use' });
    }
    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) return res.status(400).json({ error: 'Username already taken' });
    }

    let hashedPassword = user.password;
    if (newPassword) {
      if (!oldPassword) {
        return res.status(400).json({ error: 'Old password is required to set a new one' });
      }
      const validPassword = await bcrypt.compare(oldPassword, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: 'Incorrect old password' });
      }
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(newPassword, salt);
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.password = hashedPassword;
    await user.save();

    res.json({ 
      message: 'Profile updated successfully', 
      user: { id: user.id, username: user.username, email: user.email, role: user.role } 
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (user) {
      await user.destroy();
    }
    res.clearCookie('token').json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error('Delete account error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { signup, login, getProfile, updateProfile, deleteAccount };
