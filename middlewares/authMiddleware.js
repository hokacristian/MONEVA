// middlewares/authMiddleware.js
const { verifyToken } = require("../configs/jwt");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header not found" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const decoded = verifyToken(token); // Menggunakan fungsi verifikasi token
    req.user = decoded; // Menyimpan payload token ke request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
}

module.exports = {
  authMiddleware,
};
