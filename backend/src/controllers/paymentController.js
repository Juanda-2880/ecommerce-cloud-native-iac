const { MercadoPagoConfig, Preference } = require('mercadopago');
const { Order, OrderItem, Product, sequelize } = require('../models');

// Use environment variable or a more stable test token
const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || 'APP_USR-6523910931215443-052813-f65c91d9aef2cf40732ebe31-1834244304';

const client = new MercadoPagoConfig({ 
  accessToken: ACCESS_TOKEN
});

const createPreference = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { items, total_amount } = req.body;
    const buyer_id = req.user.id;

    if (!items || items.length === 0) {
      await t.rollback();
      return res.status(400).json({ error: 'Cannot create payment for empty cart' });
    }

    // Create a pending order in our DB
    const order = await Order.create({
      buyer_id,
      total_amount,
      status: 'pending' // Should be pending until payment is confirmed
    }, { transaction: t });

    // Create order items
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

    const preference = new Preference(client);
    
    // Construct the preference body
    const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8082';
    
    const preferenceBody = {
      body: {
        items: items.map(item => ({
          id: item.id.toString(),
          title: item.name,
          quantity: Number(item.quantity),
          unit_price: Number(item.price_cop),
          currency_id: 'COP'
        })),
        back_urls: {
          success: `${FRONTEND_URL}/order-history`,
          failure: `${FRONTEND_URL}/basket`,
          pending: `${FRONTEND_URL}/order-history`
        },
        external_reference: order.id.toString(),
      }
    };

    // MP API strictly rejects localhost for auto_return
    if (FRONTEND_URL.startsWith('https://')) {
      preferenceBody.body.auto_return = 'approved';
    }

    console.log("Creating MP Preference with payload:", JSON.stringify(preferenceBody, null, 2));

    // Only add notification_url if it's a valid public URL (MercadoPago requirement)
    if (process.env.BACKEND_URL && process.env.BACKEND_URL.startsWith('https')) {
      preferenceBody.body.notification_url = `${process.env.BACKEND_URL}/api/payments/webhook`;
    }

    const result = await preference.create(preferenceBody);

    res.json({ id: result.id, init_point: result.init_point });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('MercadoPago Error Details FULL:', err);
    res.status(500).json({ error: 'MercadoPago integration error. Please check your credentials.' });
  }
};

const handleWebhook = async (req, res) => {
  const { query } = req;
  const topic = query.topic || query.type;

  try {
    if (topic === 'payment') {
      const paymentId = query.id || query['data.id'];
      // Here you would normally fetch the payment details from MP using the ID
      // and update the order status in the DB based on the status (approved, rejected, etc.)
      console.log(`Payment notification received for ID: ${paymentId}`);
      
      // Example update:
      // const result = await payment.get({ id: paymentId });
      // if (result.status === 'approved') {
      //   const orderId = result.external_reference;
      //   await Order.update({ status: 'completed' }, { where: { id: orderId } });
      // }
    }
    res.sendStatus(200);
  } catch (err) {
    console.error('Webhook error:', err);
    res.sendStatus(500);
  }
};

module.exports = {
  createPreference,
  handleWebhook
};
