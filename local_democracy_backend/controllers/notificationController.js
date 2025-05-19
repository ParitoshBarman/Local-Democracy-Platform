const { sampleNotifications } = require("../utils/notificationData");

const getAllNotifications = async (req, res) => {
  res.json(sampleNotifications);
};


// *******************************
const Notification = require("../models/notificationModel");

let io; // Socket.IO instance

// Setter to receive io from main server
const setSocketIOInstance = (ioInstance) => {
  io = ioInstance;
};

// Create a notification and emit it to all connected clients
const createNotification = async (req, res) => {
  try {
    const { title, description, type, link } = req.body;

    const newNotification = new Notification({
      ...req.body,
      postedBy: req.user._id,
    });

    const saved = await newNotification.save();

    if (io) {
      io.emit("notification", saved); // Real-time push
    }

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create notification", error: err.message });
  }
};

// Get all notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }).populate("postedBy", "name email");
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch notifications", error: err.message });
  }
};

// Get a single notification by ID
const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id).populate("postedBy", "name email");
    if (!notification) return res.status(404).json({ msg: "Notification not found" });

    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch notification", error: err.message });
  }
};

// Update a notification
const updateNotification = async (req, res) => {
  try {

    const updated = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ msg: "Notification not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update notification", error: err.message });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  try {
    const deleted = await Notification.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Notification not found" });

    res.status(200).json({ msg: "Notification deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete notification", error: err.message });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
  setSocketIOInstance,
  getAllNotifications
};
