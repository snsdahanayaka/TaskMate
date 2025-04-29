const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    // Example: Bearer <token>
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No authorization header" });
    }

    const token = authHeader.split(" ")[1]; // after "Bearer"
    if (!token) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const decoded = jwt.verify(token, "SECRET_KEY");
    // Find user in DB
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "Invalid user" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("authMiddleware error:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authMiddleware;
