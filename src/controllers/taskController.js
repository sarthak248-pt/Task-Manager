const taskStore = require("../store/taskStore");

// GET /tasks
// Supports ?status=pending|done and ?sort=createdAt
const getAllTasks = (req, res) => {
  const { status, sort } = req.query;

  // Validate status query param if provided
  if (status && !["pending", "done"].includes(status)) {
    return res.status(400).json({
      error: "Invalid status value. Allowed values: pending, done",
    });
  }

  let tasks = taskStore.getAll();

  if (status) {
    tasks = tasks.filter((t) => t.status === status);
  }

  if (sort === "createdAt") {
    tasks = [...tasks].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }

  res.status(200).json({ count: tasks.length, tasks });
};

// GET /tasks/:id
const getTaskById = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Task ID must be a valid number" });
  }

  const task = taskStore.getById(id);
  if (!task) {
    return res.status(404).json({ error: `Task with ID ${id} not found` });
  }

  res.status(200).json(task);
};

// POST /tasks
const createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res
      .status(400)
      .json({ error: "title is required and must be a non-empty string" });
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({ error: "description must be a string" });
  }

  const task = taskStore.create({ title, description });
  res.status(201).json(task);
};

// PUT /tasks/:id
const updateTask = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Task ID must be a valid number" });
  }

  const { title, description } = req.body;

  if (title === undefined && description === undefined) {
    return res
      .status(400)
      .json({ error: "Provide at least one field to update: title or description" });
  }

  if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
    return res
      .status(400)
      .json({ error: "title must be a non-empty string" });
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({ error: "description must be a string" });
  }

  const task = taskStore.update(id, { title, description });
  if (!task) {
    return res.status(404).json({ error: `Task with ID ${id} not found` });
  }

  res.status(200).json(task);
};

// PATCH /tasks/:id/done
const markTaskDone = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Task ID must be a valid number" });
  }

  const task = taskStore.markDone(id);
  if (!task) {
    return res.status(404).json({ error: `Task with ID ${id} not found` });
  }

  res.status(200).json(task);
};

// DELETE /tasks/:id
const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Task ID must be a valid number" });
  }

  const deleted = taskStore.delete(id);
  if (!deleted) {
    return res.status(404).json({ error: `Task with ID ${id} not found` });
  }

  res.status(200).json({ message: `Task ${id} deleted successfully` });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  markTaskDone,
  deleteTask,
};
