const express = require('express');
const { createCart, getCart, addItem, removeItem } = require('../controllers/cartController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/', authenticate, createCart);
router.get('/', authenticate, getCart);
router.post('/item', authenticate, addItem);
router.delete('/item', authenticate, removeItem);

module.exports = router;
