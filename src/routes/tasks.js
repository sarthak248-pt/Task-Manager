const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  markTaskDone,
  deleteTask,
} = require("../controllers/taskController");

// Helper: return 405 for unsupported methods on a known route
const methodNotAllowed = (req, res) => {
  res.status(405).json({
    error: `Method ${req.method} is not allowed on ${req.originalUrl}`,
  });
};

// /tasks
router
  .route("/")
  .get(getAllTasks)
  .post(createTask)
  .all(methodNotAllowed);

// /tasks/:id
router
  .route("/:id")
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask)
  .all(methodNotAllowed);

// /tasks/:id/done
router
  .route("/:id/done")
  .patch(markTaskDone)
  .all(methodNotAllowed);

module.exports = router;
