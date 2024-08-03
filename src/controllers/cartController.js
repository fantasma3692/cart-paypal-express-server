const { createCart, getCartByUserId, updateCartStatus } = require('../models/Cart');
const { addItemToCart, getItemsByCartId, removeItemFromCart } = require('../models/CartItem');

exports.createCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await createCart(userId);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await getCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    const items = await getItemsByCartId(cart.id);
    res.status(200).json({ cart, items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addItem = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  try {
    const cart = await getCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    const item = await addItemToCart(cart.id, productId, quantity);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeItem = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  try {
    const cart = await getCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    await removeItemFromCart(cart.id, productId);
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCartStatus = async (req, res) => {
  const userId = req.user.id;
  const { status } = req.body;
  try {
    const cart = await getCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    const updatedCart = await updateCartStatus(cart.id, status);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
