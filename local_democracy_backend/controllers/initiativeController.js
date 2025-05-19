const Initiative = require("../models/initiativeModel");
const Notification = require("../models/notificationModel");

let io; // To hold Socket.IO instance

// Set Socket.IO instance (called in index.js or main server)
const setSocketIOInstance = (ioInstance) => {
    io = ioInstance;
};

// Create a new initiative
const createInitiative = async (req, res) => {
    try {
        const { title, description, date, type } = req.body;

        const newInitiative = new Initiative({
            title,
            description,
            date,
            type,
            postedBy: req.user._id,
        });

        const savedInitiative = await newInitiative.save();

        // Create a notification
        const newNotification = new Notification({
            title: `New Initiative: ${title}`,
            description: `A new ${type} initiative has been posted.`,
            type: "initiative",
            link: `/initiatives/${savedInitiative._id}`,
            postedBy: req.user._id,
        });

        const savedNotification = await newNotification.save();

        // Emit real-time notification
        if (io) {
            io.emit("notification", savedNotification);
        }

        res.status(201).json(savedInitiative);
    } catch (err) {
        res.status(500).json({ msg: "Failed to create initiative", error: err.message });
    }
};

// Get all initiatives with optional filters
const getAllInitiatives = async (req, res) => {
    try {
        const { type, date } = req.query;

        let filter = {};
        if (type) filter.type = type;
        if (date) filter.date = new Date(date);

        const initiatives = await Initiative.find(filter)
            .sort({ createdAt: -1 })
            .populate("postedBy", "name email profilePhoto");

        res.status(200).json(initiatives);
    } catch (err) {
        res.status(500).json({ msg: "Failed to fetch initiatives", error: err.message });
    }
};

// Get initiative by ID
const getInitiativeById = async (req, res) => {
    try {
        const initiative = await Initiative.findById(req.params.id)
            .populate("postedBy", "name email profilePhoto");

        if (!initiative) {
            return res.status(404).json({ msg: "Initiative not found" });
        }

        res.status(200).json(initiative);
    } catch (err) {
        res.status(500).json({ msg: "Failed to fetch initiative", error: err.message });
    }
};

// Update initiative
const updateInitiative = async (req, res) => {
    try {
        const updatedInitiative = await Initiative.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedInitiative) {
            return res.status(404).json({ msg: "Initiative not found" });
        }

        res.status(200).json(updatedInitiative);
    } catch (err) {
        res.status(500).json({ msg: "Failed to update initiative", error: err.message });
    }
};

// Delete initiative
const deleteInitiative = async (req, res) => {
    try {
        const deleted = await Initiative.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ msg: "Initiative not found" });
        }

        res.status(200).json({ msg: "Initiative deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Failed to delete initiative", error: err.message });
    }
};

module.exports = {
    createInitiative,
    getAllInitiatives,
    getInitiativeById,
    updateInitiative,
    deleteInitiative,
    setSocketIOInstance,
};
