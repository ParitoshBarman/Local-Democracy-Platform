const express = require("express");
const auth = require("../middlewares/authMiddleware");
const {
  createNotification,
  getNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
  getAllNotifications
} = require("../controllers/notificationController");



const router = express.Router();


router.post("/", auth, createNotification);
router.get("/", getNotifications);
router.get("/:id", getNotificationById);
router.patch("/:id", auth, updateNotification);
router.delete("/:id", auth, deleteNotification);



router.get("/", getAllNotifications);

module.exports = router;
