const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.put("/theme", authMiddleware, authController.updateTheme);
router.post("/register", authController.register);

router.put("/username", authMiddleware, authController.updateUsername);
router.put("/password", authMiddleware, authController.updatePassword);


module.exports = router;
