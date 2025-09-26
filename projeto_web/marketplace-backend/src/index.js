const express = require('express');
const dotenv = require('dotenv');
const db = require('./db');
const usersRouter = require('./routes/users');
const storesRouter = require('./routes/stores');
const productsRouter = require('./routes/products');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', usersRouter);
app.use('/stores', storesRouter);
app.use('/products', productsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});