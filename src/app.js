const express = require("express");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(express.json());

// Mount task routes
app.use("/tasks", taskRoutes);

// Handle 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

module.exports = app;
