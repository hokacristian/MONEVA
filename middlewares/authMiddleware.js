// middlewares/authMiddleware.js
const { verifyToken } = require('../configs/jwt');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header not found' });
  }

  const token = authHeader.split(' ')[1]; // "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // simpan payload token ke request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
}

// Contoh middleware khusus ADMIN
function adminOnly(req, res, next) {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Admin only' });
  }
  next();
}

module.exports = {
  authMiddleware,
  adminOnly,
};
