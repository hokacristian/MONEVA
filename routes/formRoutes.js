const express = require("express");
const multer = require("multer");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  tambahFormInput,
  tambahOutcome,
  tambahDampak,
  getAllDampak,
  getDampakById,
  updateDampak,
  getAllOutcomes,
  getOutcomeById,
  updateOutcome,
  getAllFormInputs,
  getFormInputById,
  updateFormInput,
} = require("../controllers/formController");

const router = express.Router();

// ✅ Gunakan memory storage untuk multer
const storage = multer.memoryStorage();
// Di file routes
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

// ✅ Pastikan authMiddleware ada sebelum upload file
// Di file router (routes)
router.post(
  "/input",
  authMiddleware,
  (req, res, next) => {
    upload.single("img")(req, res, (err) => {
      if (err) {
        console.error("❌ Multer Error:", err.message);
        return res.status(400).json({ message: "Gagal memproses file", error: err.message });
      }
      next();
    });
  },
  tambahFormInput
);
// Outcome Routes
router.post("/outcome/:id", tambahOutcome);
router.get("/outcome", getAllOutcomes);
router.get("/outcome/:id", getOutcomeById);
router.patch("/outcome/:id", updateOutcome);

// Dampak Routes
router.post("/dampak/:id", tambahDampak);
router.get("/dampak", getAllDampak);
router.get("/dampak/:id", getDampakById);
router.patch("/dampak/:id", updateDampak);

// Form Input Routes
router.get("/input", getAllFormInputs);
router.get("/input/:id", getFormInputById);
router.patch("/input/:id", upload.single("img"), updateFormInput);

module.exports = router;
