const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load .env variables

const authRoutes = require('./routes/authRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const practiceRoutes = require("./routes/practiceRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(express.json());

// ✅ CORS Configuration for development and production
const allowedOrigins = [
  "http://localhost:3000",
  "https://meetconnect-owf4.onrender.com",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// ✅ Session Configuration for cross-origin and HTTPS on Render
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dummySecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set true on Render
      sameSite: "lax", // Important for cookies to work across domains
    },
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use("/api/practice", practiceRoutes);
app.use("/api/blogs", blogRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://shivani:shivani0509@cluster0.72ou97n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Start server (except in test environment)
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
