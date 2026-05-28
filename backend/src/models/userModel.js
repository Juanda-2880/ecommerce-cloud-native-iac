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
    const [rows] = await pool.query('SELECT id, username, email, role FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  findByIdWithPassword: async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  update: async (id, userData) => {
    const { username, email, password } = userData;
    let query = 'UPDATE users SET username = ?, email = ?';
    const params = [username, email];

    if (password) {
      query += ', password = ?';
      params.push(password);
    }

    query += ' WHERE id = ?';
    params.push(id);

    await pool.query(query, params);
  },

  delete: async (id) => {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
  },

  create: async (username, email, password, role) => {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Insert into main users table
      const [userResult] = await connection.query(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        [username, email, password, role]
      );
      const userId = userResult.insertId;

      // Insert into specific "apart" table based on role
      if (role === 'salesperson') {
        await connection.query('INSERT INTO salespeople (user_id) VALUES (?)', [userId]);
      } else {
        await connection.query('INSERT INTO buyers (user_id) VALUES (?)', [userId]);
      }

      await connection.commit();
      return userId;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
};

module.exports = User;
