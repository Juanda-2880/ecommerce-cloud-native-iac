const mysql = require('mysql2/promise');
require('dotenv').config();

const [host, port] = (process.env.DB_HOST || '').split(':');
const pool = mysql.createPool({
  host: host || 'localhost',
  port: port || 3306,
  user: process.env.DB_USER || 'ecommerce_admin',
  password: process.env.DB_PASSWORD || 'SecurePassword123!',
  database: process.env.DB_NAME || 'ecommerce_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const initDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL database');
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table ensured');
    connection.release();
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
};

module.exports = { pool, initDB };
