const jwt = require("jsonwebtoken");
const Blacklist = require("../models/blacklistModel");
const User = require("../models/userModel");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({ msg: "No token provided" });

    const token = authHeader.split(" ")[1];

    try {
        // Check if token is blacklisted
        const isBlacklisted = await Blacklist.findOne({ token });
        if (isBlacklisted)
            return res.status(401).json({ msg: "Token is blacklisted. Please login again." });

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(404).json({ msg: "User not found" });

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Invalid or expired token", error: err.message });
    }
};

module.exports = authMiddleware;
