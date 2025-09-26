const express = require('express');
const router = express.Router();
const prisma = require('../db');

// Create Store
router.post('/', async (req, res, next) => {
  try {
    const { name, userId } = req.body;
    const store = await prisma.store.create({ data: { name, userId } });
    res.json(store);
  } catch (err) { next(err); }
});

// Get all Stores
router.get('/', async (req, res, next) => {
  try {
    const stores = await prisma.store.findMany();
    res.json(stores);
  } catch (err) { next(err); }
});

// Get Store by ID (include owner and products)
router.get('/:id', async (req, res, next) => {
  try {
    const store = await prisma.store.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        user: true,
        products: true
      }
    });
    if (!store) return res.status(404).json({ error: 'Store not found' });
    res.json(store);
  } catch (err) { next(err); }
});

// Update Store
router.put('/:id', async (req, res, next) => {
  try {
    const { name, userId } = req.body;
    const store = await prisma.store.update({
      where: { id: Number(req.params.id) },
      data: { name, userId }
    });
    res.json(store);
  } catch (err) { next(err); }
});

// Delete Store
router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.store.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Store deleted' });
  } catch (err) { next(err); }
});

module.exports = router;