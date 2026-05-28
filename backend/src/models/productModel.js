const { pool } = require('../config/db');

const Product = {
  create: async (productData) => {
    const { name, description, price_cop, quantity, product_condition, is_negotiable, image_url, is_published, seller_id } = productData;
    const [result] = await pool.query(
      'INSERT INTO products (name, description, price_cop, quantity, product_condition, is_negotiable, image_url, is_published, seller_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, description, price_cop, quantity, product_condition, is_negotiable, image_url, is_published, seller_id]
    );
    return result.insertId;
  },

  findAll: async (filters = {}) => {
    let query = `
      SELECT p.*, u.username as seller_name 
      FROM products p 
      JOIN users u ON p.seller_id = u.id 
      WHERE p.is_published = TRUE
    `;
    const params = [];

    if (filters.search) {
      query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    query += ' ORDER BY p.created_at DESC';

    const [rows] = await pool.query(query, params);
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query(`
      SELECT p.*, u.username as seller_name 
      FROM products p 
      JOIN users u ON p.seller_id = u.id 
      WHERE p.id = ?
    `, [id]);
    return rows[0];
  },

  findAllBySeller: async (seller_id, filters = {}) => {
    let query = 'SELECT * FROM products WHERE seller_id = ?';
    const params = [seller_id];

    if (filters.search) {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.is_published !== undefined) {
      query += ' AND is_published = ?';
      params.push(filters.is_published);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.query(query, params);
    return rows;
  },

  update: async (id, productData) => {
    const { name, description, price_cop, quantity, product_condition, is_negotiable, image_url, is_published } = productData;
    await pool.query(
      'UPDATE products SET name = ?, description = ?, price_cop = ?, quantity = ?, product_condition = ?, is_negotiable = ?, image_url = ?, is_published = ? WHERE id = ?',
      [name, description, price_cop, quantity, product_condition, is_negotiable, image_url, is_published, id]
    );
  },

  delete: async (id) => {
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
  }
};

module.exports = Product;
