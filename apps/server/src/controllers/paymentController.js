// ============================================================
// SOBRE RUEDAS — Payment Controller
// Controladores para todas las pasarelas de pago
// ============================================================

const axios = require('axios');
require('dotenv').config();

// ============================================================
// MERCADO PAGO
// ============================================================

/**
 * Inicializa una preferencia de pago en Mercado Pago (Checkout Pro)
 * El frontend redirige al checkout de MP con el preference_id
 */
const createMercadoPagoPreference = async (req, res) => {
  try {
    const { items, buyer, orderId, discountAmount = 0, backUrls } = req.body;

    const preference = {
      items: items.map((item) => ({
        id: item.productId,
        title: item.name,
        description: item.description || item.name,
        quantity: item.quantity,
        currency_id: 'ARS',
        unit_price: parseFloat(item.unitPrice),
      })),
      payer: {
        name: buyer.name,
        email: buyer.email,
        phone: { number: buyer.phone || '' },
        address: {
          street_name: buyer.address?.street || '',
          zip_code: buyer.address?.zip || '',
        },
      },
      back_urls: {
        success: backUrls?.success || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/success`,
        failure: backUrls?.failure || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/failure`,
        pending: backUrls?.pending || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/pending`,
      },
      auto_return: 'approved',
      external_reference: orderId,
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/webhooks/mercadopago`,
      statement_descriptor: 'SOBRE RUEDAS',
      // Cuotas hasta 12 sin interés (configurar en panel de MP)
      payment_methods: {
        installments: 12,
      },
      ...(discountAmount > 0 && {
        discounts: [
          {
            amount: parseFloat(discountAmount),
            description: 'Descuento aplicado',
          },
        ],
      }),
    };

    const response = await axios.post(
      'https://api.mercadopago.com/checkout/preferences',
      preference,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({
      preference_id: response.data.id,
      init_point: response.data.init_point,         // URL redirect completo
      sandbox_init_point: response.data.sandbox_init_point,
    });
  } catch (error) {
    console.error('[MP Preference Error]', error.response?.data || error.message);
    res.status(500).json({
      error: 'Error al crear preferencia de Mercado Pago',
      details: process.env.NODE_ENV === 'development' ? error.response?.data : undefined,
    });
  }
};

/**
 * Obtiene el estado de un pago de Mercado Pago por su ID
 */
const getMercadoPagoPaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const response = await axios.get(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
      }
    );

    const payment = response.data;
    res.json({
      id: payment.id,
      status: payment.status,             // 'approved' | 'pending' | 'rejected'
      status_detail: payment.status_detail,
      amount: payment.transaction_amount,
      external_reference: payment.external_reference,
      payment_method: payment.payment_method_id,
      installments: payment.installments,
      approved_at: payment.date_approved,
    });
  } catch (error) {
    console.error('[MP Payment Status Error]', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al consultar el pago' });
  }
};

/**
 * Webhook de Mercado Pago — recibe notificaciones de cambio de estado
 */
const handleMercadoPagoWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      const paymentId = data.id;
      
      // Consultar el pago actualizado
      const response = await axios.get(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        { headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` } }
      );

      const payment = response.data;
      
      // TODO: Actualizar estado de la orden en Supabase
      // await updateOrderStatus(payment.external_reference, payment.status);
      
      console.log(`[MP Webhook] Pago ${paymentId} — Estado: ${payment.status}`);
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('[MP Webhook Error]', error.message);
    res.status(500).json({ error: 'Error procesando webhook' });
  }
};

// ============================================================
// PAYPAL
// ============================================================

// Obtener access token de PayPal
const getPayPalAccessToken = async () => {
  const credentials = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const baseURL =
    process.env.PAYPAL_MODE === 'live'
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com';

  const response = await axios.post(
    `${baseURL}/v1/oauth2/token`,
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return { token: response.data.access_token, baseURL };
};

/**
 * Crea una orden de PayPal
 */
const createPayPalOrder = async (req, res) => {
  try {
    const { amount, currency = 'USD', orderId, items } = req.body;

    const { token, baseURL } = await getPayPalAccessToken();

    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: orderId,
          description: 'Compra en Sobre Ruedas',
          amount: {
            currency_code: currency,
            value: parseFloat(amount).toFixed(2),
            breakdown: {
              item_total: {
                currency_code: currency,
                value: parseFloat(amount).toFixed(2),
              },
            },
          },
          items: items?.map((item) => ({
            name: item.name,
            unit_amount: { currency_code: currency, value: parseFloat(item.unitPrice).toFixed(2) },
            quantity: item.quantity.toString(),
          })),
        },
      ],
      application_context: {
        brand_name: 'Sobre Ruedas',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancelled`,
      },
    };

    const response = await axios.post(`${baseURL}/v2/checkout/orders`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    res.json({
      paypal_order_id: response.data.id,
      status: response.data.status,
      links: response.data.links,
    });
  } catch (error) {
    console.error('[PayPal Create Order Error]', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al crear orden de PayPal' });
  }
};

/**
 * Captura el pago de una orden de PayPal aprobada
 */
const capturePayPalOrder = async (req, res) => {
  try {
    const { paypalOrderId } = req.params;
    const { token, baseURL } = await getPayPalAccessToken();

    const response = await axios.post(
      `${baseURL}/v2/checkout/orders/${paypalOrderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const capture = response.data;
    const captureDetail = capture.purchase_units[0].payments.captures[0];

    res.json({
      status: capture.status,
      capture_id: captureDetail.id,
      amount: captureDetail.amount.value,
      currency: captureDetail.amount.currency_code,
      reference_id: capture.purchase_units[0].reference_id,
    });
  } catch (error) {
    console.error('[PayPal Capture Error]', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al capturar el pago de PayPal' });
  }
};

// ============================================================
// MODO (Argentina — Pagos QR y Billetera)
// ============================================================

/**
 * Inicia un pago con MODO
 * MODO es una red de billeteras digitales argentinas (Galicia, BBVA, etc.)
 */
const createModoPayment = async (req, res) => {
  try {
    const { amount, orderId, description } = req.body;

    // MODO usa su propia API REST con QR dinámico
    const payload = {
      merchant_id: process.env.MODO_MERCHANT_ID,
      amount: Math.round(parseFloat(amount) * 100), // en centavos
      currency: 'ARS',
      description: description || 'Compra en Sobre Ruedas',
      reference: orderId,
      expiration: 300, // 5 minutos
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/modo`,
    };

    const response = await axios.post(
      'https://api.modomercado.com/v1/payments', // URL de producción MODO
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.MODO_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({
      payment_id: response.data.id,
      qr_code: response.data.qr_code,           // QR string (base64 o URL)
      qr_image_url: response.data.qr_image_url, // URL de imagen del QR
      deep_link: response.data.deep_link,       // Para abrir la app de MODO
      expires_at: response.data.expires_at,
    });
  } catch (error) {
    console.error('[MODO Payment Error]', error.response?.data || error.message);
    res.status(500).json({
      error: 'Error al iniciar pago con MODO',
      // En desarrollo, simular respuesta para testing
      ...(process.env.NODE_ENV === 'development' && {
        mock: {
          payment_id: `MODO-MOCK-${Date.now()}`,
          qr_code: 'MOCK_QR_CODE',
          message: 'Modo mock — configurá las credenciales reales de MODO',
        },
      }),
    });
  }
};

// ============================================================
// NAVE (Argentina — Transferencias 3.0)
// ============================================================

/**
 * Inicia un pago con Nave (Transferencias 3.0 del BCRA)
 * Compatible con CBU/CVU de cualquier banco o billetera
 */
const createNavePayment = async (req, res) => {
  try {
    const { amount, orderId, buyerEmail } = req.body;

    const payload = {
      merchant_id: process.env.NAVE_MERCHANT_ID,
      amount: parseFloat(amount),
      currency: 'ARS',
      reference: orderId,
      payer_email: buyerEmail,
      expires_in: 900, // 15 minutos
      webhook_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/nave`,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    };

    const response = await axios.post(
      'https://api.nave.app/v1/payments', // URL de producción Nave
      payload,
      {
        headers: {
          'X-API-Key': process.env.NAVE_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({
      payment_id: response.data.id,
      transfer_alias: response.data.alias,  // Alias para la transferencia
      cbu: response.data.cbu,
      amount: response.data.amount,
      qr_code: response.data.qr_code,
      expires_at: response.data.expires_at,
    });
  } catch (error) {
    console.error('[Nave Payment Error]', error.response?.data || error.message);
    res.status(500).json({
      error: 'Error al iniciar pago con Nave',
      ...(process.env.NODE_ENV === 'development' && {
        mock: {
          payment_id: `NAVE-MOCK-${Date.now()}`,
          message: 'Nave mock — configurá las credenciales reales de Nave',
        },
      }),
    });
  }
};

// ============================================================
// PAYWAY (Tarjetas de crédito/débito locales con cuotas)
// ============================================================

/**
 * Tokeniza y procesa un pago con Payway
 * Payway es el procesador de tarjetas de Prisma (ex VISA/MC local)
 * Soporta cuotas en cuotas sin interés (CSI) con bancos argentinos
 */
const createPaywayPayment = async (req, res) => {
  try {
    const {
      orderId,
      amount,
      installments,
      cardToken,      // Token generado por el SDK de Payway en el frontend
      buyerEmail,
      buyerName,
    } = req.body;

    const payload = {
      site: {
        id: process.env.PAYWAY_MERCHANT_ID,
        transaction_id: orderId,
      },
      customer: {
        email: buyerEmail,
        name: buyerName,
      },
      payment: {
        total: Math.round(parseFloat(amount) * 100), // en centavos
        currency: 'ARS',
        installments: parseInt(installments) || 1,
        token: cardToken,
        description: 'Compra en Sobre Ruedas',
      },
    };

    // Generar hash HMAC para autenticación con Payway
    const crypto = require('crypto');
    const message = `${process.env.PAYWAY_MERCHANT_ID}${orderId}${payload.payment.total}`;
    const signature = crypto
      .createHmac('sha256', process.env.PAYWAY_SECRET_KEY)
      .update(message)
      .digest('hex');

    const response = await axios.post(
      'https://decidir.api.administracion.visa.com/api/v2/payments', // Payway endpoint
      payload,
      {
        headers: {
          apikey: process.env.PAYWAY_API_KEY,
          'X-Consumer-Username': process.env.PAYWAY_MERCHANT_ID,
          'Content-Type': 'application/json',
          'X-Signature': signature,
        },
      }
    );

    const payment = response.data;
    res.json({
      payment_id: payment.id,
      status: payment.status,
      amount: payment.amount,
      installments: payment.installments,
      card_brand: payment.card_brand,
      last_four: payment.card_number?.slice(-4),
      authorization_code: payment.authorization_code,
    });
  } catch (error) {
    console.error('[Payway Payment Error]', error.response?.data || error.message);
    res.status(500).json({
      error: 'Error al procesar el pago con tarjeta',
      details: process.env.NODE_ENV === 'development' ? error.response?.data : undefined,
    });
  }
};

/**
 * Obtiene las cuotas disponibles para un BIN de tarjeta (Payway)
 */
const getPaywayInstallments = async (req, res) => {
  try {
    const { bin, amount } = req.query;

    const response = await axios.get(
      `https://decidir.api.administracion.visa.com/api/v2/cs/installments`,
      {
        params: { bin, amount: Math.round(parseFloat(amount) * 100) },
        headers: {
          apikey: process.env.PAYWAY_API_KEY,
          'X-Consumer-Username': process.env.PAYWAY_MERCHANT_ID,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('[Payway Installments Error]', error.message);
    // Respuesta de fallback con cuotas estándar
    res.json({
      installments: [1, 3, 6, 12].map((n) => ({
        installments: n,
        installment_amount: Math.round((parseFloat(req.query.amount || 0) / n) * 100) / 100,
        total_amount: parseFloat(req.query.amount || 0),
        interest: 0,
        label: n === 1 ? 'Pago único' : `${n} cuotas sin interés`,
      })),
    });
  }
};

// ============================================================
// EXPORTS
// ============================================================

module.exports = {
  // Mercado Pago
  createMercadoPagoPreference,
  getMercadoPagoPaymentStatus,
  handleMercadoPagoWebhook,
  // PayPal
  createPayPalOrder,
  capturePayPalOrder,
  // MODO
  createModoPayment,
  // Nave
  createNavePayment,
  // Payway
  createPaywayPayment,
  getPaywayInstallments,
};
