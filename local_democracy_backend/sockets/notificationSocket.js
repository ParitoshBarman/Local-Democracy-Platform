const { getRandomNotification } = require("../utils/notificationData");

module.exports = function (socket) {
  const intervalId = setInterval(() => {
    socket.emit("notification", getRandomNotification());
  }, 15000);

  socket.on("disconnect", () => {
    clearInterval(intervalId);
    console.log("Disconnected:", socket.id);
  });
};
