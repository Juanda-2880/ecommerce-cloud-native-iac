const { pool } = require('../config/db');

const Product = {
  create: async (productData) => {
    const { name, description, price_cop, is_negotiable, image_url, is_published, seller_id } = productData;
    const [result] = await pool.query(
      'INSERT INTO products (name, description, price_cop, is_negotiable, image_url, is_published, seller_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description, price_cop, is_negotiable, image_url, is_published, seller_id]
    );
    return result.insertId;
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

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  },

  update: async (id, productData) => {
    const { name, description, price_cop, is_negotiable, image_url, is_published } = productData;
    await pool.query(
      'UPDATE products SET name = ?, description = ?, price_cop = ?, is_negotiable = ?, image_url = ?, is_published = ? WHERE id = ?',
      [name, description, price_cop, is_negotiable, image_url, is_published, id]
    );
  },

  delete: async (id) => {
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
  }
};

module.exports = Product;
