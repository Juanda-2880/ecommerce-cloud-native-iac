const { MercadoPagoConfig, Preference } = require('mercadopago');

const client = new MercadoPagoConfig({ 
  accessToken: 'APP_USR-2384610578886259-052813-0a4d24ef8e12daa0e42a11badbeb5d85-3433470360' 
});

async function test() {
  try {
    const preference = new Preference(client);
    const preferenceBody = {
      body: {
        items: [{ id: '1', title: 'Test', quantity: 1, unit_price: 1000, currency_id: 'COP' }],
        back_urls: {
          success: 'http://localhost:8082/order-history',
          failure: 'http://localhost:8082/basket',
          pending: 'http://localhost:8082/order-history'
        }
      }
    };
    const result = await preference.create(preferenceBody);
    console.log("Success! ID:", result.id);
  } catch (err) {
    console.error("Failed!", err.message || err);
  }
}
test();