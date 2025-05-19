const express = require("express");
const cors = require("cors");
const path = require('path')
const notificationRoutes = require("./routes/notificationRoutes");
const authRoutes = require('./routes/authRoutes');
const lawRoutes = require('./routes/lawRoutes')
const voteRoutes = require("./routes/voteRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes")
const impactRoutes = require('./routes/impactRoutes')
const storyRouter = require('./routes/storyRoutes')
const initiativeRoutes = require('./routes/initiativeRoutes')




const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve profile images


// Health check
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use("/api/notifications", notificationRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/laws", lawRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/impacts", impactRoutes);
app.use("/api/stories", storyRouter);
app.use("/api/initiatives", initiativeRoutes);

module.exports = app;
