// const express = require('express');
// const session = require('express-session');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config(); // Ensure dotenv is required to load .env variables

// const authRoutes = require('./routes/authRoutes');
// const interviewRoutes = require('./routes/interviewRoutes');
// const feedbackRoutes = require('./routes/feedbackRoutes');
// const practiceRoutes = require("./routes/practiceRoutes");
// const blogRoutes = require("./routes/blogRoutes");


// const app = express();

// app.use(express.json());


// app.use(cors({ origin: "https://meetconnect-owf4.onrender.com", credentials: true }));



// // Session middleware without secret key (use with caution in production)
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || 'dummySecret', 
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: true,
//       secure: false, // Set to `true` if using HTTPS
//     },
//   })
// );


// // Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use('/api/interviews', interviewRoutes);
// app.use('/api/feedback', feedbackRoutes);
// app.use("/api/practice", practiceRoutes);
// app.use("/api/blogs", blogRoutes);

// mongoose.connect('mongodb+srv://shivani:shivani0509@cluster0.72ou97n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// // Start server only if not in test environment
// if (process.env.NODE_ENV !== "test") {
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  
// }

// // Export app for testing
// module.exports = app;


const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const practiceRoutes = require("./routes/practiceRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(express.json());

// ✅ Allow frontend to access backend with cookies
app.use(cors({
  origin: "https://meetconnect-owf4.onrender.com",
  credentials: true,
}));

// ✅ Secure session configuration for cross-site cookies
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dummySecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,         // ✅ Set to true for HTTPS
      sameSite: 'none',     // ✅ Enable cross-site cookies
    },
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use("/api/practice", practiceRoutes);
app.use("/api/blogs", blogRoutes);

// MongoDB Connection
mongoose.connect('mongodb+srv://shivani:shivani0509@cluster0.72ou97n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Start server
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
