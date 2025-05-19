const express = require("express");
const router = express.Router();

const {
    submitFeedback,
    getAllFeedbacks,
} = require("../controllers/feedbackController");

const protect = require("../middlewares/authMiddleware");
const roleMiddleware = require('../middlewares/roleMiddleware')

// Submit feedback (Public)
router.post("/", submitFeedback);

// Admin can view all feedbacks
router.get("/", protect, roleMiddleware(["admin"]), getAllFeedbacks);

module.exports = router;
