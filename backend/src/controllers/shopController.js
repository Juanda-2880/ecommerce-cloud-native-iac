const { pool } = require('../config/db');

// Get all products
const getProducts = async (req, res) => {
  try {
    const [products] = await pool.query('SELECT * FROM products');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cart logic
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const [items] = await pool.query(`
      SELECT ci.id, ci.quantity, p.id as product_id, p.name, p.price, p.image_url 
      FROM cart_items ci 
      JOIN products p ON ci.product_id = p.id 
      WHERE ci.user_id = ?
    `, [userId]);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;
    
    await pool.query(`
      INSERT INTO cart_items (user_id, product_id, quantity) 
      VALUES (?, ?, ?) 
      ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
    `, [userId, productId, quantity]);
    
    res.json({ message: 'Product added to cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartItemId } = req.params;
    await pool.query('DELETE FROM cart_items WHERE id = ? AND user_id = ?', [cartItemId, userId]);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Payment Simulation
const processCheckout = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // 1. Get cart total
    const [cartItems] = await pool.query(`
      SELECT SUM(p.price * ci.quantity) as total 
      FROM cart_items ci 
      JOIN products p ON ci.product_id = p.id 
      WHERE ci.user_id = ?
    `, [userId]);
    
    const total = cartItems[0].total;
    
    if (!total || total === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // 2. Create Order (Simulation)
    const [result] = await pool.query(
      'INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)',
      [userId, total, 'paid']
    );

    // 3. Clear Cart
    await pool.query('DELETE FROM cart_items WHERE user_id = ?', [userId]);

    res.json({ 
      message: 'Payment simulated successfully!', 
      orderId: result.insertId,
      total: total 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getCart,
  addToCart,
  removeFromCart,
  processCheckout
};
