const express = require("express");
const router = express.Router();
const {
  createVote,
  getAllVotes,
  getVoteById,
  upvote,
  downvote,
  updateVote,
  deleteVote,
} = require("../controllers/voteController");

const protect = require("../middlewares/authMiddleware"); 

// Create a new vote (protected)
router.post("/", protect, createVote);

// Get all votes (public)
router.get("/", getAllVotes);

// Get single vote by ID (public)
router.get("/:id", getVoteById);

// Upvote a post (protected)
router.post("/:id/upvote", protect, upvote);

// Downvote a post (protected)
router.post("/:id/downvote", protect, downvote);

// Update a vote (protected)
router.patch("/:id", protect, updateVote);

// Delete a vote (protected)
router.delete("/:id", protect, deleteVote);

module.exports = router;
