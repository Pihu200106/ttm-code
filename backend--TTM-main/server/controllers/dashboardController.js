const prisma = require("../prisma/prismaClient");

const getDashboardStats = async (req, res) => {
  try {
    // Check if logged in user is admin
    const isAdmin = req.user.role === "ADMIN";

    // Admin sees all tasks
    // Member sees only assigned tasks
    const taskFilter = isAdmin
      ? {}
      : {
          assignedTo: req.user.id,
        };

    // Total Tasks
    const totalTasks = await prisma.task.count({
      where: taskFilter,
    });

    // Completed Tasks
    const completedTasks = await prisma.task.count({
      where: {
        ...taskFilter,
        status: "DONE",
      },
    });

    // Pending Tasks
    const pendingTasks = await prisma.task.count({
      where: {
        ...taskFilter,
        status: {
          not: "DONE",
        },
      },
    });

    // Overdue Tasks
    const overdueTasks = await prisma.task.count({
      where: {
        ...taskFilter,
        dueDate: {
          lt: new Date(),
        },
        status: {
          not: "DONE",
        },
      },
    });

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};