const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["Utility", "Alert", "Event", "Announcement", "General", "law", "vote", "story"],
            default: "General",
        },
        link: {
            type: String, // Optional: could be a URL or route to redirect
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true, // whoever uploads this notification
        }
    },
    {
        timestamps: true // adds createdAt and updatedAt
    }
);

module.exports = mongoose.model("Notification", notificationSchema);
