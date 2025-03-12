const multer = require('multer');

const storage = multer.memoryStorage(); // Simpan di memori sementara
const upload = multer({ storage: storage });

module.exports = upload;
