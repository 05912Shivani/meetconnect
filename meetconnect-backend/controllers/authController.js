const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register user
const registerUser = async (req, res) => {
  const { name, email, password, contact, dob } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, contact, dob });

    await user.save();
    req.session.userId = user._id; // Store session
    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
    console.log("Session Data:", req.session);

  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    req.session.userId = user._id; // Store session
    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Logout user
const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    res.clearCookie("connect.sid"); // Clear session cookie
    res.status(200).json({ message: "Logged out successfully" });
  });
};

// ✅ Fetch User Profile
const getUserProfile = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const user = await User.findById(req.session.userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // ✅ Convert DOB to YYYY-MM-DD before sending
    const formattedUser = {
      ...user.toObject(),
      dob: user.dob ? user.dob.toISOString().split("T")[0] : null, // Format DOB
    };

    res.status(200).json(user);
  } catch (error) {
    console.error("🔥 Error fetching user profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const { name, contact, dob } = req.body;
    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.contact = contact || user.contact;
    // ✅ Convert YYYY-MM-DD string to Date object before saving
    if (dob) {
      user.dob = new Date(dob);
    }

    await user.save();
    res.status(200).json({ 
      message: "Profile updated successfully", 
      user: { 
        name: user.name, 
        email: user.email, 
        contact: user.contact, 
        dob: user.dob.toISOString().split("T")[0] // ✅ Format DOB in response
      } 
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

module.exports = { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile };