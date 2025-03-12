const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const { tambahFormInput } = require('../controllers/formController');

const router = express.Router();

// Endpoint untuk submit form dengan gambar
router.post('/input', upload.single('img'), tambahFormInput);

module.exports = router;
