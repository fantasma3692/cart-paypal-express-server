const express = require('express');
const { createPayment, executePayment, cancelPayment } = require('../controllers/paymentController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/create', authenticate, createPayment);
router.get('/success', authenticate, executePayment);
router.get('/cancel', cancelPayment);

module.exports = router;
