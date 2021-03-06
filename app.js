const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Controllers
const { globalErrorHandler } = require('./controllers/errors.controller');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { ordersRouter } = require('./routes/orders.routes');
const { productsRouter } = require('./routes/products.routes');
const { productsInCartRouter } = require('./routes/productsInCart.routes');
const { cartsRouter } = require('./routes/carts.routes');

// Init express app
const app = express();

// Enable CORS
app.use(cors());

// Enable incoming JSON data
app.use(express.json());

// Limit IP requests
const limiter = rateLimit({
  max: 10000,
  windowMs: 1 * 60 * 60 * 1000, // 1 hr
  message: 'Too many requests from this IP',
});

app.use(limiter);

// Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/productsInCart', productsInCartRouter);
app.use('/api/v1/cart', cartsRouter);

// Global error handler
app.use('*', globalErrorHandler);

module.exports = { app };
