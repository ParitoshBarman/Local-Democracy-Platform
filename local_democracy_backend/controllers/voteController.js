const Vote = require("../models/voteModel");
const Notification = require("../models/notificationModel");

let io; // to store Socket.IO instance

// Setter function to be called in your index.js or app.js
const setSocketIOInstance = (ioInstance) => {
  io = ioInstance;
};

// Create a new vote post
const createVote = async (req, res) => {
  try {
    const { title, description, category, startDate, endDate } = req.body;

    const newVote = new Vote({
      title,
      description,
      category,
      startDate,
      endDate,
      postedBy: req.user._id,
    });

    const savedVote = await newVote.save();

    // Create a notification
    const newNotification = new Notification({
      title: `New Vote: ${title}`,
      description: `A new vote has been posted in the ${category} category.`,
      type: "vote",
      link: `/votes/${savedVote._id}`,
      postedBy: req.user._id,
    });

    const savedNotification = await newNotification.save();

    // Emit via socket.io
    if (io) {
      io.emit("notification", savedNotification);
    }

    res.status(201).json(savedVote);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create vote", error: err.message });
  }
};

// Get all votes with optional filters
const getAllVotes = async (req, res) => {
  try {
    const { category, search } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const votes = await Vote.find(filter)
      .sort({ createdAt: -1 })
      .populate("postedBy", "name email");

    res.status(200).json(votes);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch votes", error: err.message });
  }
};

// Get single vote by ID
const getVoteById = async (req, res) => {
  try {
    const vote = await Vote.findById(req.params.id).populate("postedBy", "name email");

    if (!vote) return res.status(404).json({ msg: "Vote not found" });

    res.status(200).json(vote);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch vote", error: err.message });
  }
};

// Upvote a post
const upvote = async (req, res) => {
  try {
    const vote = await Vote.findById(req.params.id);
    if (!vote) return res.status(404).json({ msg: "Vote not found" });

    const userId = req.user._id.toString();

    if (vote.votes.up.includes(userId)) {
      return res.status(400).json({ msg: "Already upvoted" });
    }

    vote.votes.down = vote.votes.down.filter(id => id.toString() !== userId);
    vote.votes.up.push(userId);

    await vote.save();


    res.status(200).json({ msg: "Upvoted successfully", vote });
  } catch (err) {
    res.status(500).json({ msg: "Failed to upvote", error: err.message });
  }
};

// Downvote a post
const downvote = async (req, res) => {
  try {
    const vote = await Vote.findById(req.params.id);
    if (!vote) return res.status(404).json({ msg: "Vote not found" });

    const userId = req.user._id.toString();

    if (vote.votes.down.includes(userId)) {
      return res.status(400).json({ msg: "Already downvoted" });
    }

    vote.votes.up = vote.votes.up.filter(id => id.toString() !== userId);
    vote.votes.down.push(userId);

    await vote.save();


    res.status(200).json({ msg: "Downvoted successfully", vote });
  } catch (err) {
    res.status(500).json({ msg: "Failed to downvote", error: err.message });
  }
};

// Delete a vote
const deleteVote = async (req, res) => {
  try {
    const vote = await Vote.findByIdAndDelete(req.params.id);
    if (!vote) return res.status(404).json({ msg: "Vote not found" });

    res.status(200).json({ msg: "Vote deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete vote", error: err.message });
  }
};

// Update a vote post
const updateVote = async (req, res) => {
  try {
    const updated = await Vote.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) return res.status(404).json({ msg: "Vote not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update vote", error: err.message });
  }
};

module.exports = {
  createVote,
  getAllVotes,
  getVoteById,
  upvote,
  downvote,
  updateVote,
  deleteVote,
  setSocketIOInstance,
};
