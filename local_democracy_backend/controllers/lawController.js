const Law = require("../models/lawModel");
const Notification = require("../models/notificationModel");


let io; // to store socket.io instance

// Setter function to be called in index.js
const setSocketIOInstance = (ioInstance) => {
    io = ioInstance;
};

// Create a new law and notify
const createLaw = async (req, res) => {
    try {
        const { title, summary, status, date, category, link } = req.body;

        const newLaw = new Law({
            ...req.body,
            postedBy: req.user._id,
        });

        const savedLaw = await newLaw.save();

        // Create a new notification
        const newNotification = new Notification({
            title: `New Law Posted: ${title}`,
            description: `A new law regarding ${category} has been proposed.`,
            type: "law",
            link: `/laws/${savedLaw._id}`,
            postedBy: req.user._id,
        });

        const savedNotification = await newNotification.save();

        // Emit real-time notification
        if (io) {
            io.emit("notification", savedNotification);
        }

        res.status(201).json(savedLaw);
    } catch (err) {
        res.status(500).json({ msg: "Failed to create law", error: err.message });
    }
};

// Get all laws (optional filters via query)
const getAllLaws = async (req, res) => {
    try {
        const { category, status } = req.query;

        let filter = {};
        if (category) filter.category = category;
        if (status) filter.status = status;

        const laws = await Law.find(filter)
            .sort({ createdAt: -1 })
            .populate("postedBy", "name email");

        res.status(200).json(laws);
    } catch (err) {
        res.status(500).json({ msg: "Failed to fetch laws", error: err.message });
    }
};

// Get a single law by ID
const getLawById = async (req, res) => {
    try {
        const law = await Law.findById(req.params.id).populate("postedBy", "name email");

        if (!law) return res.status(404).json({ msg: "Law not found" });

        res.status(200).json(law);
    } catch (err) {
        res.status(500).json({ msg: "Failed to fetch law", error: err.message });
    }
};

// Update a law
const updateLaw = async (req, res) => {
    try {
        const updatedLaw = await Law.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!updatedLaw) return res.status(404).json({ msg: "Law not found" });

        res.status(200).json(updatedLaw);
    } catch (err) {
        res.status(500).json({ msg: "Failed to update law", error: err.message });
    }
};

// Delete a law
const deleteLaw = async (req, res) => {
    try {
        const deletedLaw = await Law.findByIdAndDelete(req.params.id);

        if (!deletedLaw) return res.status(404).json({ msg: "Law not found" });

        res.status(200).json({ msg: "Law deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Failed to delete law", error: err.message });
    }
};

module.exports = {
    createLaw,
    getAllLaws,
    getLawById,
    updateLaw,
    deleteLaw,
    setSocketIOInstance
};
