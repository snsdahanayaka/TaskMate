const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register Endpoint
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash with salt rounds = 10
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered", userId: newUser._id });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
      // Duplicate username error
      return res.status(409).json({ error: "Username already exists. Please choose another username." });
    }
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const token = jwt.sign({ userId: user._id }, "SECRET_KEY", {
      expiresIn: "1h",
    });
    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        theme: user.theme,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateTheme = async (req, res) => {
  // This route requires the user to be logged in
  try {
    // `req.user` will be set by our auth middleware (see below)
    const userId = req.user._id;
    const { theme } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { theme },
      { new: true }
    );

    res.json({
      message: "Theme updated",
      theme: updatedUser.theme,
    });
  } catch (error) {
    console.error("Error updating theme:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update Username Endpoint
exports.updateUsername = async (req, res) => {
  try {
    const { newUsername } = req.body;
    if (!newUsername || !newUsername.trim()) {
      return res.status(400).json({ message: "Username cannot be empty." });
    }
    // Optionally check if the new username is already taken
    const existingUser = await User.findOne({ username: newUsername });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken." });
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { username: newUsername },
      { new: true }
    );
    res.json({ username: updatedUser.username });
  } catch (error) {
    console.error("Error updating username:", error);
    res.status(500).json({ message: "Server error updating username." });
  }
};

// Update Password Endpoint
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Please fill in all password fields." });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters." });
    }
    const user = await User.findById(req.user._id);
    // Compare provided currentPassword with the stored hashed password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect." });
    }
    // Hash new password and update
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Server error updating password." });
  }
};