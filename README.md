# Task Manager API

A simple REST API for managing personal tasks — built with Node.js and Express. All data is stored in-memory (no database required).

---

## Getting Started

### Prerequisites
- Node.js v14 or higher
- npm

### Installation & Running

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd task-manager

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

The server will start on **http://localhost:3000**

---

## API Endpoints

| Method | Endpoint            | Description                    |
|--------|---------------------|--------------------------------|
| POST   | /tasks              | Create a new task              |
| GET    | /tasks              | Get all tasks                  |
| GET    | /tasks/:id          | Get a single task by ID        |
| PUT    | /tasks/:id          | Update task title/description  |
| PATCH  | /tasks/:id/done     | Mark a task as completed       |
| DELETE | /tasks/:id          | Delete a task                  |

### Task Object

```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "pending",
  "createdAt": "2025-01-01T10:00:00.000Z"
}
```

---

## Example Requests (curl)

### Create a task
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'
```

**Response (201)**
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "pending",
  "createdAt": "2025-01-01T10:00:00.000Z"
}
```

---

### Get all tasks
```bash
curl http://localhost:3000/tasks
```

**Response (200)**
```json
{
  "count": 1,
  "tasks": [
    {
      "id": 1,
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "status": "pending",
      "createdAt": "2025-01-01T10:00:00.000Z"
    }
  ]
}
```

---

### Get all tasks — filter by status
```bash
curl "http://localhost:3000/tasks?status=pending"
```

---

### Get all tasks — sorted by creation time
```bash
curl "http://localhost:3000/tasks?sort=createdAt"
```

---

### Get a single task
```bash
curl http://localhost:3000/tasks/1
```

**Response (200)**
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "pending",
  "createdAt": "2025-01-01T10:00:00.000Z"
}
```

---

### Update a task
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries and vegetables"}'
```

**Response (200)**
```json
{
  "id": 1,
  "title": "Buy groceries and vegetables",
  "description": "Milk, eggs, bread",
  "status": "pending",
  "createdAt": "2025-01-01T10:00:00.000Z"
}
```

---

### Mark a task as done
```bash
curl -X PATCH http://localhost:3000/tasks/1/done
```

**Response (200)**
```json
{
  "id": 1,
  "title": "Buy groceries and vegetables",
  "description": "Milk, eggs, bread",
  "status": "done",
  "createdAt": "2025-01-01T10:00:00.000Z"
}
```

---

### Delete a task
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

**Response (200)**
```json
{
  "message": "Task 1 deleted successfully"
}
```

---

## Error Responses

| Status | Meaning                              |
|--------|--------------------------------------|
| 400    | Bad request — missing or invalid fields |
| 404    | Task not found                       |
| 405    | Method not allowed on this route     |

### Example — missing title (400)
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{}'
```
```json
{ "error": "title is required and must be a non-empty string" }
```

### Example — task not found (404)
```bash
curl http://localhost:3000/tasks/999
```
```json
{ "error": "Task with ID 999 not found" }
```

### Example — method not allowed (405)
```bash
curl -X DELETE http://localhost:3000/tasks
```
```json
{ "error": "Method DELETE is not allowed on /tasks" }
```

---

## Project Structure

```
task-manager/
├── index.js                        # Entry point — starts the server
├── package.json
├── README.md
└── src/
    ├── app.js                      # Express app setup
    ├── controllers/
    │   └── taskController.js       # Route handler logic
    ├── routes/
    │   └── tasks.js                # Route definitions
    └── store/
        └── taskStore.js            # In-memory data store
```
