const Feedback = require("../models/feedbackModel");

// Create feedback
const submitFeedback = async (req, res) => {
    try {
        const { name, email, issue, message } = req.body;

        if (!name || !email || !issue || !message) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const newFeedback = new Feedback({ name, email, issue, message });
        await newFeedback.save();

        res.status(201).json({ msg: "Feedback submitted successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Failed to submit feedback", error: err.message });
    }
};

// Get all feedbacks (Admin use only - optionally)
const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ submittedAt: -1 });
        res.status(200).json(feedbacks);
    } catch (err) {
        res.status(500).json({ msg: "Failed to fetch feedbacks", error: err.message });
    }
};

module.exports = {
    submitFeedback,
    getAllFeedbacks,
};
