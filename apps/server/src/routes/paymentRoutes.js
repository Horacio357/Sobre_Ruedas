// ============================================================
// SOBRE RUEDAS — Payment Routes
// ============================================================

const express = require('express');
const router = express.Router();
const {
  createMercadoPagoPreference,
  getMercadoPagoPaymentStatus,
  handleMercadoPagoWebhook,
  createPayPalOrder,
  capturePayPalOrder,
  createModoPayment,
  createNavePayment,
  createPaywayPayment,
  getPaywayInstallments,
} = require('../controllers/paymentController');

// --- Mercado Pago ---
router.post('/mercadopago/preference', createMercadoPagoPreference);
router.get('/mercadopago/status/:paymentId', getMercadoPagoPaymentStatus);
router.post('/webhooks/mercadopago', handleMercadoPagoWebhook);

// --- PayPal ---
router.post('/paypal/order', createPayPalOrder);
router.post('/paypal/capture/:paypalOrderId', capturePayPalOrder);

// --- MODO ---
router.post('/modo/payment', createModoPayment);

// --- Nave ---
router.post('/nave/payment', createNavePayment);

// --- Payway ---
router.post('/payway/payment', createPaywayPayment);
router.get('/payway/installments', getPaywayInstallments);

module.exports = router;
