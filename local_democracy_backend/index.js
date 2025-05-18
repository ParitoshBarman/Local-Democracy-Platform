const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const connectDB = require('./config/db');
const notificationSocket = require("./sockets/notificationSocket");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://local-democracy-platform.netlify.app", "http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  notificationSocket(socket);  // Pass socket to your custom handler
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  connectDB();
});
