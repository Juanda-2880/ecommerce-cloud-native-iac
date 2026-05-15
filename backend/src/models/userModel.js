const { pool } = require('../config/db');

const User = {
  findByEmail: async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  findByUsername: async (username) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT id, username, email FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  create: async (username, email, password) => {
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );
    return result.insertId;
  }
};

module.exports = User;
