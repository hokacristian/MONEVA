// routes/authRoutes.js
const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { register, login, logout, whoami } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/whoami', authMiddleware, whoami);


module.exports = router;
