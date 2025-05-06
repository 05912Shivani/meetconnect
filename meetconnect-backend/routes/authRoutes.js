// const express = require('express');
// const { registerUser, loginUser, logoutUser,getUserProfile, updateUserProfile } = require('../controllers/authController');
// const authMiddleware = require("../middleware/authMiddleware");

// const router = express.Router();

// // Registration Route
// router.post('/register', registerUser);

// // Login Route
// router.post('/login', loginUser);

// // Logout Route
// router.post('/logout', logoutUser);

// // Profile Routes
// router.get("/profile", getUserProfile);
// router.put("/profile/update",updateUserProfile);


// module.exports = router;


const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/authController');
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// 🔒 Protect these routes with session-based auth
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile/update", authMiddleware, updateUserProfile);

module.exports = router;
