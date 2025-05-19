const express = require("express");
const router = express.Router();

const {
  createStory,
  getAllStories,
  getStoryById,
  updateStory,
  deleteStory
} = require("../controllers/storyController");

const authMiddleware = require("../middlewares/authMiddleware");

// Routes

// Create a new story (protected route)
router.post("/", authMiddleware, createStory);

// Get all stories (public or protected depending on your app)
router.get("/", getAllStories);

// Get a single story by ID
router.get("/:id", getStoryById);

// Update a story by ID (protected route)
router.patch("/:id", authMiddleware, updateStory);

// Delete a story by ID (protected route)
router.delete("/:id", authMiddleware, deleteStory);

module.exports = router;
