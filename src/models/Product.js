const pool = require('../config/db');

const getProducts = async () => {
  const { rows } = await pool.query('SELECT * FROM products');
  return rows;
};

const getProduct = async (id) => {
  const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  return rows[0];
};

const createProduct = async (name, price) => {
  const { rows } = await pool.query(
    'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
    [name, price]
  );
  return rows[0];
};

const updateProduct = async (id, name, price) => {
  const { rows } = await pool.query(
    'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
    [name, price, id]
  );
  return rows[0];
};

const deleteProduct = async (id) => {
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
