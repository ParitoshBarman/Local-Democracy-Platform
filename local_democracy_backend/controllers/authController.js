const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const Blacklist = require("../models/blacklistModel");
const User = require('../models/userModel')
require('dotenv').config();

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};



// ==========================
// 🧾 Register User
// ==========================
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const profilePhoto = req.file ? `/uploads/${req.file.filename}` : "";

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ msg: "User already exists" });

        const newUser = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, 10),
            role: role || "user",
            profilePhoto
        });

        res.status(201).json({
            msg: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                profilePhoto: newUser.profilePhoto
            }
        });
    } catch (err) {
        res.status(500).json({ msg: "Registration failed", error: err.message });
    }
};

// ==========================
// 🔐 Login User
// ==========================
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(400).json({ msg: "Invalid email or password" });


        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.status(200).json({
            msg: "Login successful",
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profilePhoto: user.profilePhoto
            }
        });
    } catch (err) {
        res.status(500).json({ msg: "Login failed", error: err.message });
    }
};

// ==========================
// 🔄 Refresh Access Token
// ==========================
exports.refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ msg: "No refresh token provided" });

    try {
        // Verify refresh token
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(payload.id);

        if (!user) return res.status(404).json({ msg: "User not found" });


        // Generate new access token
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        res.status(200).json({
            msg: "New access token generated",
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });

    } catch (err) {
        return res.status(403).json({ msg: "Refresh token expired or invalid", error: err.message });
    }
};

// ==========================
// 🚪 Logout User
// ==========================
exports.logoutUser = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    // const refreshToken = req.cookies.refreshToken;

    try {
        // Blacklist access token
        if (token) {
            const decoded = jwt.verify(token);
            const expiresAt = new Date(decoded.exp * 1000);
            await Blacklist.create({ token, expiresAt });
        }

        res.status(200).json({ msg: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Logout failed", error: err.message });
    }
};


exports.verifyUser = async (req, res) => {
    try {
        const { accessToken } = req.body;
        if (!accessToken) return res.status(401).json({ msg: "No token provided" });

        const isBlacklisted = await Blacklist.findOne({ token: accessToken });
        if (isBlacklisted)
            return res.status(401).json({ msg: "Token is blacklisted. Please login again." });

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(404).json({ msg: "User not found" });
        res.status(200).json({ msg: "Verification Successfull", verifyStatus: true, user })

    } catch (error) {
        res.status(500).json({ msg: "Verification failed", verifyStatus: false, error: error.message });
    }

}