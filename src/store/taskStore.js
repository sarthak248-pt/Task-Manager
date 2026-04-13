let tasks = [];
let nextId = 1;

const taskStore = {
  getAll() {
    return tasks;
  },

  getById(id) {
    return tasks.find((t) => t.id === id) || null;
  },

  create({ title, description = "" }) {
    const task = {
      id: nextId++,
      title: title.trim(),
      description: description.trim(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    return task;
  },

  update(id, { title, description }) {
    const task = this.getById(id);
    if (!task) return null;

    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description.trim();

    return task;
  },

  markDone(id) {
    const task = this.getById(id);
    if (!task) return null;

    task.status = "done";
    return task;
  },

  delete(id) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;

    tasks.splice(index, 1);
    return true;
  },
};

module.exports = taskStore;
