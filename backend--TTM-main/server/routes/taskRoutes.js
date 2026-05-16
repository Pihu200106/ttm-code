const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");

// Create Task
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createTask
);

// Get Tasks
router.get("/", authMiddleware, getTasks);

// Update Task Status
router.put("/:id", authMiddleware, updateTaskStatus);

// Delete Task
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteTask
);

module.exports = router;