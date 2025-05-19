const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Infrastructure", "Environment", "Health", "Education", "Other"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Closed"],
      default: "Upcoming",
    },
    votes: {
      up: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // user IDs who upvoted
      down: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // user IDs who downvoted
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual field to count votes
voteSchema.virtual("voteCount").get(function () {
  return {
    up: this.votes.up.length,
    down: this.votes.down.length,
  };
});

module.exports = mongoose.model("Vote", voteSchema);
