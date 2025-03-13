const express = require("express");
const { tambahPlace, getAllPlaces, deletePlace } = require("../controllers/placeController");

const router = express.Router();

// Route untuk menambahkan tempat baru
router.post("/places", tambahPlace);

// Route untuk mendapatkan semua tempat
router.get("/places", getAllPlaces);

// Route untuk menghapus tempat berdasarkan ID
router.delete("/places/:id", deletePlace);

module.exports = router;
