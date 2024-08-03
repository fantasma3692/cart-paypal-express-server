const { getUserRoleById } = require('../models/User');
const isAdmin = async (req, res, next) => {
  const user = req.user;
  console.log(user.id)
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const userRole = await getUserRoleById(user.id);
  
    if (userRole !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: "que pedo" });
  }
};

module.exports = isAdmin;
