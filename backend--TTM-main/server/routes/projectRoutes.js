const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createProject,
  getProjects,
  deleteProject,
} = require("../controllers/projectController");

// Create Project
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createProject
);

// Get Projects
router.get("/", authMiddleware, getProjects);

// Delete Project
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteProject
);

module.exports = router;