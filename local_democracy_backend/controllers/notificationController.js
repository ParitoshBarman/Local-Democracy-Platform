const { sampleNotifications } = require("../utils/notificationData");

exports.getAllNotifications = (req, res) => {
  res.json(sampleNotifications);
};
