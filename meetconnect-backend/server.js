const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const practiceRoutes = require("./routes/practiceRoutes");
const blogRoutes = require("./routes/blogRoutes");


const app = express();

app.use(express.json());


app.use(cors({ origin: "http://localhost:3000", credentials: true }));



app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Change to `true` if using HTTPS
    },
  })
);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use('/api/interviews', interviewRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use("/api/practice", practiceRoutes);
app.use("/api/blogs", blogRoutes);

mongoose.connect('mongodb://localhost:27017/meetconnect')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Start server only if not in test environment
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  
}

// Export app for testing
module.exports = app;
