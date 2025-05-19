const express = require("express");
const router = express.Router();
const {
    createLaw,
    getAllLaws,
    getLawById,
    updateLaw,
    deleteLaw
} = require("../controllers/lawController");


const protect = require("../middlewares/authMiddleware");

// Create a new law (protected)
router.post("/", protect, createLaw);

// Get all laws (with optional filters: ?category=...&status=...)
router.get("/", getAllLaws);

// Get a single law by ID
router.get("/:id", getLawById);

// Update a law (protected)
router.patch("/:id", protect, updateLaw);

// Delete a law (protected)
router.delete("/:id", protect, deleteLaw);

module.exports = router;
