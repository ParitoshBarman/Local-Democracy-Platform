const express = require("express");
const cors = require("cors");
const notificationRoutes = require("./routes/notificationRoutes");
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use("/api/notifications", notificationRoutes);
app.use('/auth', authRoutes);

module.exports = app;
