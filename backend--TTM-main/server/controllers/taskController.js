const prisma = require("../prisma/prismaClient");

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      projectId,
      assignedTo,
    } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        dueDate: new Date(dueDate),
        projectId,
        assignedTo,
      },
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "ADMIN") {
      tasks = await prisma.task.findMany({
        include: {
          project: true,
          user: true,
        },
      });
    } else {
      tasks = await prisma.task.findMany({
        where: {
          assignedTo: req.user.id,
        },
        include: {
          project: true,
          user: true,
        },
      });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await prisma.task.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (
      req.user.role !== "ADMIN" &&
      task.assignedTo !== req.user.id
    ) {
      return res.status(403).json({
        message:
          "You can update only your own tasks",
      });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        status,
      },
    });

    res.status(200).json({
      message: "Task updated successfully",
      updatedTask,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
};