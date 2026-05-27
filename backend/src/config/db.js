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

    // Products Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        image_url VARCHAR(255),
        stock INT DEFAULT 10,
        seller_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);

    // Cart Items Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY user_product (user_id, product_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);

    // Orders Table (for payment simulation)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        status ENUM('pending', 'paid', 'shipped') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Seed sample products if empty
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM products');
    if (rows[0].count === 0) {
      console.log('Seeding initial products...');
      await connection.query(`
        INSERT INTO products (name, description, price, image_url) VALUES 
        ('Neon Keyboard', 'Mechanical keyboard with RGB lighting', 89.99, 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500'),
        ('Cyber Headset', 'High-fidelity audio for gaming', 129.50, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'),
        ('Neon Mouse', 'Precision laser mouse with ergonomic design', 45.00, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500'),
        ('Retro Console', 'Classic games with a modern twist', 199.99, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500')
      `);
    }

    console.log('Database schema (Users, Products, Cart, Orders) ensured');
    connection.release();
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
};

module.exports = { pool, initDB };
