const express = require('express');
const router = express.Router();
const prisma = require('../db');

// Create Product
router.post('/', async (req, res, next) => {
  try {
    const { name, price, storeId } = req.body;
    const product = await prisma.product.create({ data: { name, price, storeId } });
    res.json(product);
  } catch (err) { next(err); }
});

// Get all Products (include store and owner)
router.get('/', async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        store: {
          include: {
            user: true
          }
        }
      }
    });
    res.json(products);
  } catch (err) { next(err); }
});

// Get Product by ID
router.get('/:id', async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        store: {
          include: {
            user: true
          }
        }
      }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) { next(err); }
});

// Update Product
router.put('/:id', async (req, res, next) => {
  try {
    const { name, price, storeId } = req.body;
    const product = await prisma.product.update({
      where: { id: Number(req.params.id) },
      data: { name, price, storeId }
    });
    res.json(product);
  } catch (err) { next(err); }
});

// Delete Product
router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.product.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Product deleted' });
  } catch (err) { next(err); }
});

module.exports = router;