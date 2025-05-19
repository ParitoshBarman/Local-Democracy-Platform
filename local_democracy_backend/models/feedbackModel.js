const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },

    issue: {
        type: String,
        required: true,
        enum: ["Suggesiion", "App Issue", "Bug", "Feature Request", "UI Problem", "Performance", "Other"],
        default: "Other",
    },

    message: {
        type: String,
        required: true,
        trim: true,
    },

    submittedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Feedback", feedbackSchema);
