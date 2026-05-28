const { pool } = require('../config/db');

const Order = {
  create: async (buyer_id, total_amount, items) => {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Create order
      const [orderResult] = await connection.query(
        'INSERT INTO orders (buyer_id, total_amount) VALUES (?, ?)',
        [buyer_id, total_amount]
      );
      const orderId = orderResult.insertId;

      // Create order items
      for (const item of items) {
        await connection.query(
          'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)',
          [orderId, item.id, item.quantity, item.price_cop]
        );

        // Update product quantity and publish status
        await connection.query(
          'UPDATE products SET quantity = quantity - ?, is_published = IF(quantity - ? <= 0, FALSE, is_published) WHERE id = ?',
          [item.quantity, item.quantity, item.id]
        );
      }

      await connection.commit();
      return orderId;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  },

  findByUser: async (buyer_id) => {
    const [rows] = await pool.query(`
      SELECT o.*, 
             JSON_ARRAYAGG(
               JSON_OBJECT(
                 'id', oi.id,
                 'product_id', oi.product_id,
                 'quantity', oi.quantity,
                 'price', oi.price_at_purchase,
                 'product_name', p.name,
                 'image_url', p.image_url
               )
             ) as items
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      WHERE o.buyer_id = ?
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `, [buyer_id]);
    return rows;
  }
};

module.exports = Order;
