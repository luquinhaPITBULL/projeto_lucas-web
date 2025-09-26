const express = require('express');
const router = express.Router();
const prisma = require('../db');

// Create User
router.post('/', async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.create({ data: { name, email } });
    res.json(user);
  } catch (err) { next(err); }
});

// Get all Users
router.get('/', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) { next(err); }
});

// Get User by ID
router.get('/:id', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(req.params.id) } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
});

// Update User
router.put('/:id', async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { name, email }
    });
    res.json(user);
  } catch (err) { next(err); }
});

// Delete User
router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.user.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'User deleted' });
  } catch (err) { next(err); }
});

module.exports = router;