import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/app.module';
import { Task } from '../src/models/task.model';
import { TaskStatus } from '../src/interfaces/task.interface';

describe('Task API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/task-management-test');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Task.deleteMany({});
  });

  describe('POST /tasks', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description',
        status: TaskStatus.PENDING,
      };

      const response = await request(app)
        .post('/tasks')
        .send(taskData)
        .expect(201);

      expect(response.body.title).toBe(taskData.title);
      expect(response.body.description).toBe(taskData.description);
      expect(response.body.status).toBe(taskData.status);
    });

    it('should return 400 for invalid task data', async () => {
      const invalidTask = {
        description: 'Missing title',
      };

      const response = await request(app)
        .post('/tasks')
        .send(invalidTask)
        .expect(400);

      expect(response.body.errors).toContain('Title is required');
    });
  });

  describe('GET /tasks/:id', () => {
    it('should return a task by id', async () => {
      const task = await Task.create({
        title: 'Test Task',
        description: 'Test Description',
        status: TaskStatus.PENDING,
      });

      const response = await request(app)
        .get(`/tasks/${task._id}`)
        .expect(200);

      expect(response.body.title).toBe(task.title);
    });

    it('should return 404 for non-existent task', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      await request(app)
        .get(`/tasks/${nonExistentId}`)
        .expect(404);
    });
  });
});