const Order = require('../models/orderModel');

const createOrder = async (req, res) => {
  try {
    const { total_amount, items } = req.body;
    const buyer_id = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    const orderId = await Order.create(buyer_id, total_amount, items);
    res.status(201).json({ message: 'Order placed successfully', orderId });
  } catch (err) {
    console.error('Error in createOrder:', err);
    res.status(500).json({ error: 'Failed to process order' });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const buyer_id = req.user.id;
    const orders = await Order.findByUser(buyer_id);
    res.json(orders);
  } catch (err) {
    console.error('Error in getOrderHistory:', err);
    res.status(500).json({ error: 'Failed to retrieve order history' });
  }
};

module.exports = {
  createOrder,
  getOrderHistory
};
