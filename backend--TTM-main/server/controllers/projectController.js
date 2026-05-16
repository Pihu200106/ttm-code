const prisma = require("../prisma/prismaClient");

const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        createdById: req.user.id,
      },
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        createdBy: true,
      },
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete all tasks related to project first
    await prisma.task.deleteMany({
      where: {
        projectId: parseInt(id),
      },
    });

    // Delete project
    await prisma.project.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  deleteProject,
};