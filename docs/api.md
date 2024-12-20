# Task Management API Documentation

## Endpoints

### GET /tasks
Returns a paginated list of tasks.

Query Parameters:
- `status` (optional): Filter by task status ("pending", "in_progress", "completed")
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)

Response:
```json
{
  "success": true,
  "data": [
    {
      "taskId": 1,
      "title": "Example Task",
      "description": "Task description",
      "status": "pending",
      "created_at": "2023-10-20T10:00:00Z",
      "updated_at": "2023-10-20T10:00:00Z"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 10
}
```

### POST /tasks
Create a new task.

Request Body:
```json
{
  "title": "Task Title",
  "description": "Task Description",
  "status": "pending"
}
```

Response (201 Created):
```json
{
  "success": true,
  "data": {
    "taskId": 1,
    "title": "Task Title",
    "description": "Task Description",
    "status": "pending",
    "created_at": "2023-10-20T10:00:00Z",
    "updated_at": "2023-10-20T10:00:00Z"
  }
}
```
