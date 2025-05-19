const Story = require("../models/storyModel");
const Notification = require("../models/notificationModel");

let io; // socket.io instance

// Setter function to inject socket.io instance from index.js
const setSocketIOInstance = (ioInstance) => {
  io = ioInstance;
};

// Create a new story and push notification
const createStory = async (req, res) => {
  try {
    const { title, description, tag, date } = req.body;

    const newStory = new Story({
      title,
      description,
      author: req.user._id, // assuming req.user is set after auth middleware
      date,
      tag,
    });

    const savedStory = await newStory.save();

    // Create notification for new story
    const newNotification = new Notification({
      title: `New Story Published: ${title}`,
      description: `A new story has been posted by ${req.user.name || "an author"}.`,
      type: "story",
      link: `/stories/${savedStory._id}`,
      postedBy: req.user._id,
    });

    const savedNotification = await newNotification.save();

    // Emit notification via socket.io if initialized
    if (io) {
      io.emit("notification", savedNotification);
    }

    res.status(201).json(savedStory);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create story", error: err.message });
  }
};

// Get all stories, with optional filters (like tags or author)
const getAllStories = async (req, res) => {
  try {
    const { tag, author } = req.query;

    let filter = {};
    if (tag) filter.tag = tag;
    if (author) filter.author = author;

    const stories = await Story.find(filter)
      .sort({ createdAt: -1 })
      .populate("author", "name email profilePhoto");

    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch stories", error: err.message });
  }
};

// Get a single story by ID
const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate("author", "name email profilePhoto");

    if (!story) return res.status(404).json({ msg: "Story not found" });

    res.status(200).json(story);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch story", error: err.message });
  }
};

// Update a story
const updateStory = async (req, res) => {
  try {
    const updatedStory = await Story.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedStory) return res.status(404).json({ msg: "Story not found" });

    res.status(200).json(updatedStory);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update story", error: err.message });
  }
};

// Delete a story
const deleteStory = async (req, res) => {
  try {
    const deletedStory = await Story.findByIdAndDelete(req.params.id);

    if (!deletedStory) return res.status(404).json({ msg: "Story not found" });

    res.status(200).json({ msg: "Story deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete story", error: err.message });
  }
};

module.exports = {
  createStory,
  getAllStories,
  getStoryById,
  updateStory,
  deleteStory,
  setSocketIOInstance,
};
