const mongoose = require("mongoose");

const impactSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  type: {
    type: String,
    required: true,
    enum: ["Health", "Education", "Environment", "Social", "Other"], // extendable
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

module.exports = mongoose.model("Impact", impactSchema);
