const mongoose = require("mongoose");

const lawSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Proposed", "Under Review", "Approved", "Rejected"],
      default: "Proposed",
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      enum: ["Environment", "Health", "Education", "Infrastructure", "Public Safety", "Other"],
      default: "Other",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    link: {
      type: String, // Optional external or internal reference
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Law", lawSchema);
