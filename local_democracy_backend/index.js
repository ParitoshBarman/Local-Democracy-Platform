const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);

  // Send notification every 5 seconds
  const intervalId = setInterval(() => {
    socket.emit("notification", {
      title: "New Update",
      description: "A new event has been posted in your area!",
      date: new Date().toLocaleString(),
    });
  }, 5000);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    clearInterval(intervalId);
  });
});

// Optional health check route
app.get("/", (req, res) => {
  res.send("Notification server is running 🚀");
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
