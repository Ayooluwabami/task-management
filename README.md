# Task Management API

A RESTful API for managing tasks built with Node.js, Express, TypeScript, and MongoDB.

## Features

- CRUD operations for tasks
- Input validation
- Error handling
- Logging
- Unit tests
- TypeScript support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/task-management
   NODE_ENV=development
   LOG_LEVEL=info
   ```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

Run tests:
```bash
npm test
```

## API Endpoints

### GET /tasks
- Returns a list of all tasks
- Optional query parameter: `status` ('pending', 'in_progress', 'completed')

### POST /tasks
- Creates a new task
- Required fields: `title`
- Optional fields: `description`, `status`

### GET /tasks/{id}
- Returns a single task by ID

### PUT /tasks/{id}
- Updates an existing task
- Updatable fields: `title`, `description`, `status`

### DELETE /tasks/{id}
- Deletes a task

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Project Structure

```
src/
├── __tests__/        # Test files
├── config/           # Configuration files
├── middleware/       # Custom middleware
├── models/          # Database models
├── routes/          # Route definitions
├── utils/           # Utility functions
├── app.controller.ts # Main controller
├── app.module.ts    # App configuration
├── app.service.ts   # Business logic
└── main.ts         # Application entry point
```