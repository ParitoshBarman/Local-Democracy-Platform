const express = require("express");
const {
    createInitiative,
    getAllInitiatives,
    getInitiativeById,
    updateInitiative,
    deleteInitiative,
} = require("../controllers/initiativeController");

const authenticateUser = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new initiative (only authenticated users)
router.post("/", authenticateUser, createInitiative);

// Get all initiatives (optional filters via query params)
router.get("/", getAllInitiatives);

// Get a single initiative by ID
router.get("/:id", getInitiativeById);

// Update an initiative (only authenticated users)
router.patch("/:id", authenticateUser, updateInitiative);

// Delete an initiative (only authenticated users)
router.delete("/:id", authenticateUser, deleteInitiative);

module.exports = router;
