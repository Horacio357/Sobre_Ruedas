const axios = require('axios');

async function run() {
  try {
    const preference = {
      items: [{ id: 'test', title: 'test', quantity: 1, unit_price: 100, currency_id: 'ARS' }],
      payer: { email: 'test@test.com' },
      back_urls: {
        success: 'https://localhost:3000/checkout/success',
        failure: 'https://localhost:3000/checkout/failure',
        pending: 'https://localhost:3000/checkout/pending'
      },
      auto_return: 'approved'
    };

    const response = await axios.post(
      'https://api.mercadopago.com/checkout/preferences',
      preference,
      {
        headers: {
          Authorization: `Bearer APP_USR-781522450035899-060411-ac9adc63335d4212eff6dc6637dd59ac-3450457402`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

run();
