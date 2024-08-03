const supabase = require('../config/supabase');
const pool = require('../config/db');
const signUp = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) throw new Error(error.stack);
  return user;
};

const signIn = async (email, password) => {
  const { session, error } = await supabase.auth.signIn({ email, password });
  if (error) throw new Error(error.stack);
  return session;
};
const getUserRoleById = async (idAuthSupabase) => {
  try {
    const { rows } = await pool.query('SELECT role FROM users WHERE id_auth_supabase = $1', [idAuthSupabase]);
    return rows[0]?.role;
  } catch (error) {
    throw new Error(error.stack);
  }
};
module.exports = { signUp, signIn,getUserRoleById };
