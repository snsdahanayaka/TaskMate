const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // For simplicity, storing plain text is not recommended in production
  theme: { type: String, default: "light" },  // Could be "light" or "dark"
});

module.exports = mongoose.model("User", userSchema);
