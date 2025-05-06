const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, contact, dob } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    //  Don't hash manually — your User model handles it
    const user = new User({ 
      name: `${firstName} ${lastName}`, 
      email, 
      password, 
      contact, 
      dob 
    });

    await user.save();
    req.session.userId = user._id; // Store session

    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: 'Error registering user', error });
  }
};


// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Debug logs
    console.log("Email:", email);
    console.log("Password entered:", password);
    console.log("Password in DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 Match result:", isMatch);

    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    req.session.userId = user._id;
    res.status(200).json({ userId: user._id, email: user.email });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
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

// Fetch User Profile
const getUserProfile = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const user = await User.findById(req.session.userId).select("-password"); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Convert DOB to YYYY-MM-DD before sending
    const formattedUser = {
      ...user.toObject(),
      dob: user.dob ? user.dob.toISOString().split("T")[0] : null, 
    };

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Update User Profile
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
    // Convert YYYY-MM-DD string to Date object before saving
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
        dob: user.dob.toISOString().split("T")[0] // Format DOB in response
      } 
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

module.exports = { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile };