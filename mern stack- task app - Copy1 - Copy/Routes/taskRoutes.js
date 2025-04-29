const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

// All these routes require the user to be logged in
router.get("/", authMiddleware, taskController.getAllTasks);
router.get("/:id", authMiddleware, taskController.getTaskById);
router.post("/", authMiddleware, taskController.createTask);
router.put("/:id", authMiddleware, taskController.updateTask);
router.delete("/:id", authMiddleware, taskController.deleteTask);

// Sub-Tasks
router.post("/:id/subtasks", authMiddleware, taskController.addSubTask);
router.put("/:id/subtasks/:subTaskId", authMiddleware, taskController.updateSubTask);
router.post("/auto-generate", authMiddleware, taskController.autoGenerateTasksForDay);

// Auto-generate
router.post("/auto-generate", authMiddleware, taskController.autoGenerateTasksForDay);

module.exports = router;
