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
    
    // Core users table with role discriminator
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('buyer', 'salesperson') NOT NULL DEFAULT 'buyer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Apart tables for future specific features
    await connection.query(`
      CREATE TABLE IF NOT EXISTS buyers (
        user_id INT PRIMARY KEY,
        points INT DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS salespeople (
        user_id INT PRIMARY KEY,
        store_name VARCHAR(255),
        rating DECIMAL(3,2) DEFAULT 0.0,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price_cop DECIMAL(15, 2) NOT NULL,
        quantity INT DEFAULT 1,
        product_condition ENUM('new', 'used', 'refurbished', 'open box') DEFAULT 'new',
        is_negotiable BOOLEAN DEFAULT FALSE,
        image_url VARCHAR(255),
        is_published BOOLEAN DEFAULT TRUE,
        seller_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('Database schema (Users, Buyers, Salespeople, Products) ensured');
    connection.release();
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
};

module.exports = { pool, initDB };
