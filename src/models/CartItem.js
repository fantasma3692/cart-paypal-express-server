const pool = require('../config/db');

const addItemToCart = async (cartId, productId, quantity) => {
  try {
    const { rows } = await pool.query(
      'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [cartId, productId, quantity]
    );
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const getItemsByCartId = async (cartId) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM cart_items WHERE cart_id = $1',
      [cartId]
    );
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeItemFromCart = async (cartId, productId) => {
  try {
    await pool.query(
      'DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2',
      [cartId, productId]
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { addItemToCart, getItemsByCartId, removeItemFromCart };
