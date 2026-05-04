// ============================================================
// SOBRE RUEDAS — Express API Server
// Maneja webhooks y controladores de pasarelas de pago
// ============================================================

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = process.env.SERVER_PORT || 4000;

// ============================================================
// MIDDLEWARE DE SEGURIDAD
// ============================================================

app.use(helmet());

// Rate limiting global
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas solicitudes. Intentá de nuevo en 15 minutos.' },
});
app.use(limiter);

// Rate limiting más estricto para checkout
const checkoutLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10,
  message: { error: 'Demasiados intentos de pago. Esperá un momento.' },
});

// CORS
const allowedOrigins = [
  process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  'https://sobreruedas.com.ar',
  'https://www.sobreruedas.com.ar',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
}));

// ============================================================
// BODY PARSERS
// ============================================================

// Importante: el webhook de MP necesita el body raw
app.use('/api/webhooks', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Logger
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ============================================================
// HEALTH CHECK
// ============================================================

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ============================================================
// RUTAS
// ============================================================

app.use('/api/payments', checkoutLimiter, paymentRoutes);

// ============================================================
// ERROR HANDLER GLOBAL
// ============================================================

app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);
  
  if (process.env.NODE_ENV === 'development') {
    return res.status(err.status || 500).json({
      error: err.message,
      stack: err.stack,
    });
  }
  
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
  });
});

// 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// ============================================================
// START SERVER
// ============================================================

app.listen(PORT, () => {
  console.log(`🛼 Sobre Ruedas API corriendo en http://localhost:${PORT}`);
  console.log(`   Entorno: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
