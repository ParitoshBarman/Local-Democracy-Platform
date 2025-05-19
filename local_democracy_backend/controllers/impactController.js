const Impact = require("../models/impactModel");
const Notification = require("../models/notificationModel");

let io; // to store socket.io instance

// Setter function to be called in index.js
const setSocketIOInstance = (ioInstance) => {
    io = ioInstance;
};

// Create a new impact and notify
const createImpact = async (req, res) => {
    try {
        const { title, description, date, type } = req.body;

        const newImpact = new Impact({
            title,
            description,
            date,
            type,
            postedBy: req.user._id, // assuming you have auth middleware
        });

        const savedImpact = await newImpact.save();

        // Create a new notification
        const newNotification = new Notification({
            title: `New Impact Recorded: ${title}`,
            description: `An impact related to ${type} has been added.`,
            type: "impact",
            link: `/impacts/${savedImpact._id}`,
            postedBy: req.user._id,
        });

        const savedNotification = await newNotification.save();

        // Emit real-time notification
        if (io) {
            io.emit("notification", savedNotification);
        }

        res.status(201).json(savedImpact);
    } catch (error) {
        res.status(500).json({ msg: "Failed to create impact", error: error.message });
    }
};

// Get all impacts (optional filtering by type)
const getAllImpacts = async (req, res) => {
    try {
        const { type } = req.query;

        const filter = {};
        if (type) filter.type = type;

        const impacts = await Impact.find(filter)
            .sort({ date: -1 })
            .populate("postedBy", "name email");

        res.status(200).json(impacts);
    } catch (error) {
        res.status(500).json({ msg: "Failed to fetch impacts", error: error.message });
    }
};

// Get single impact by ID
const getImpactById = async (req, res) => {
    try {
        const impact = await Impact.findById(req.params.id).populate("postedBy", "name email");
        if (!impact) return res.status(404).json({ msg: "Impact not found" });

        res.status(200).json(impact);
    } catch (error) {
        res.status(500).json({ msg: "Failed to fetch impact", error: error.message });
    }
};

// Update an impact
const updateImpact = async (req, res) => {
    try {
        const updatedImpact = await Impact.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedImpact) return res.status(404).json({ msg: "Impact not found" });

        res.status(200).json(updatedImpact);
    } catch (error) {
        res.status(500).json({ msg: "Failed to update impact", error: error.message });
    }
};

// Delete an impact
const deleteImpact = async (req, res) => {
    try {
        const deletedImpact = await Impact.findByIdAndDelete(req.params.id);
        if (!deletedImpact) return res.status(404).json({ msg: "Impact not found" });

        res.status(200).json({ msg: "Impact deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Failed to delete impact", error: error.message });
    }
};

module.exports = {
    createImpact,
    getAllImpacts,
    getImpactById,
    updateImpact,
    deleteImpact,
    setSocketIOInstance,
};
