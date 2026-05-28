const { Order, OrderItem, Product, sequelize } = require('../models');

const createOrder = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { total_amount, items } = req.body;
    const buyer_id = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    // Create order
    const order = await Order.create({
      buyer_id,
      total_amount
    }, { transaction: t });

    // Create order items and update product stock
    for (const item of items) {
      await OrderItem.create({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price_cop
      }, { transaction: t });

      // Update product quantity and publish status
      const product = await Product.findByPk(item.id, { transaction: t });
      if (product) {
        const newQuantity = product.quantity - item.quantity;
        await product.update({
          quantity: newQuantity,
          is_published: newQuantity <= 0 ? false : product.is_published
        }, { transaction: t });
      }
    }

    await t.commit();
    res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
  } catch (err) {
    await t.rollback();
    console.error('Error in createOrder:', err);
    res.status(500).json({ error: 'Failed to process order' });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const buyer_id = req.user.id;
    const orders = await Order.findAll({
      where: { buyer_id },
      include: [{
        model: OrderItem,
        as: 'items',
        include: [{
          model: Product,
          as: 'product',
          attributes: ['name', 'image_url']
        }]
      }],
      order: [['created_at', 'DESC']]
    });
    
    // Format to match the previous JSON structure if needed
    const formattedOrders = orders.map(o => {
      const orderData = o.toJSON();
      orderData.items = orderData.items.map(item => ({
        id: item.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price_at_purchase,
        product_name: item.product ? item.product.name : 'Unknown Product',
        image_url: item.product ? item.product.image_url : null
      }));
      return orderData;
    });

    res.json(formattedOrders);
  } catch (err) {
    console.error('Error in getOrderHistory:', err);
    res.status(500).json({ error: 'Failed to retrieve order history' });
  }
};

module.exports = {
  createOrder,
  getOrderHistory
};
