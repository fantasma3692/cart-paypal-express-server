const pool = require('../config/db');



const createCart = async (userId) => {
  try {
    const { rows } = await pool.query(
      'INSERT INTO carts (user_id, status) VALUES ($1, $2) RETURNING *',
      [userId, 'active']
    );
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const getCartByUserId = async (userId) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM carts WHERE user_id = $1 AND status = $2',
      [userId, 'active']
    );
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCartStatus = async (cartId, status) => {
  try {
    const { rows } = await pool.query(
      'UPDATE carts SET status = $1 WHERE id = $2 RETURNING *',
      [status, cartId]
    );
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createCart, getCartByUserId, updateCartStatus };
