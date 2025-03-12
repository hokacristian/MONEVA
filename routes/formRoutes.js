const express = require("express");
const { authMiddleware } = require('../middlewares/authMiddleware');

const upload = require("../middlewares/uploadMiddleware");
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

router.post("/input", authMiddleware, upload.single("img"), tambahFormInput);
router.post("/outcome/:id", tambahOutcome);
router.post("/dampak/:id", tambahDampak);

// Get all Dampak
router.get("/dampak", getAllDampak);

// Get single Dampak by ID
router.get("/dampak/:id", getDampakById);

// Update Dampak
router.patch("/dampak/:id", updateDampak);

// Get all Outcomes
router.get("/outcome", getAllOutcomes);

// Get single Outcome by ID
router.get("/outcome/:id", getOutcomeById);

// Update Outcome
router.patch("/outcome/:id", updateOutcome);

// Get all Form Inputs
router.get("/input", getAllFormInputs);

// Get single Form Input by ID
router.get("/input/:id", getFormInputById);

// Update Form Input (PATCH) - harus menangani file
router.patch("/input/:id", upload.single("img"), updateFormInput);

module.exports = router;
