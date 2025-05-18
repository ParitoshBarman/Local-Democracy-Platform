const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const User = require('../models/userModel')

const router = express.Router();

// 👤 Register a user (with optional profile photo)
router.post("/register", upload.single("profilePhoto"), authController.registerUser);

// 🔐 Login user
router.post("/login", authController.loginUser);

// 🔁 Refresh token
router.post("/refresh-token", authController.refreshAccessToken);

// 🚪 Logout user (blacklists access token)
router.post("/logout", authMiddleware, authController.logoutUser);

// 🧾 Get current user info (protected)
router.get("/me", authMiddleware, async (req, res) => {
    let user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ user });
});

// 🔒 Example: protected admin-only route
router.get("/admin-data", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
    res.json({ msg: "This is protected admin-only data." });
});


module.exports = router;
