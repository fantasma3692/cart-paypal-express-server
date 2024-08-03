const paypal = require('../config/paypal');
const { getCartByUserId, updateCartStatus } = require('../models/Cart');

exports.createPayment = (req, res) => {
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: 'http://localhost:5000/api/payment/success',
      cancel_url: 'http://localhost:5000/api/payment/cancel'
    },
    transactions: [{
      item_list: {
        items: req.body.items
      },
      amount: {
        currency: 'USD',
        total: req.body.total
      },
      description: 'This is the payment description.'
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      return res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({ payment });
    }
  });
};

exports.executePayment = async (req, res) => {
  const { paymentId, PayerID } = req.query;

  const execute_payment_json = {
    payer_id: PayerID,
    transactions: [{
      amount: {
        currency: 'USD',
        total: req.query.total
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
    if (error) {
      return res.status(500).json({ error: error.response });
    } else {
      // Aquí actualizamos el estado del carrito a 'completed'.
      const userId = req.user.id;

      try {
        // const cart = await getCartByUserId(userId);
        // if (!cart) {
        //   return res.status(404).json({ error: 'Cart not found' });
        // }
        // const updatedCart = await updateCartStatus(1, 'completed');
        console.log("completado")
        // res.status(200).json({ payment, cart: updatedCart });
        res.status(200).json({ payment, cart: "completado" });
      } catch (dbError) {
        res.status(500).json({ error: dbError.message });
      }
    }
  });
};

exports.cancelPayment = (req, res) => {
  res.status(200).json({ message: 'Payment cancelled' });
};
