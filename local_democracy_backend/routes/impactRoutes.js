const express = require("express");
const router = express.Router();

const {
    createImpact,
    getAllImpacts,
    getImpactById,
    updateImpact,
    deleteImpact
} = require("../controllers/impactController");

const authenticateUser = require("../middlewares/authMiddleware");

// Create a new impact (Protected)
router.post("/", authenticateUser, createImpact);

// Get all impacts (with optional filtering)
router.get("/", getAllImpacts);

// Get a single impact by ID
router.get("/:id", getImpactById);

// Update an impact (Protected)
router.patch("/:id", authenticateUser, updateImpact);

// Delete an impact (Protected)
router.delete("/:id", authenticateUser, deleteImpact);

module.exports = router;
