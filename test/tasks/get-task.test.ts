import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../src/app.module';
import { Task } from '../../src/models/task.model';
import { TaskStatus } from '../../src/interfaces/task.interface';

describe('GET /tasks/:id', () => {
  beforeEach(async () => {
    await Task.deleteMany({});
  });

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
    expect(response.body.description).toBe(task.description);
    expect(response.body.status).toBe(task.status);
  });

  it('should return 404 for non-existent task', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await request(app)
      .get(`/tasks/${nonExistentId}`)
      .expect(404);
  });

  it('should return 400 for invalid task id format', async () => {
    await request(app)
      .get('/tasks/invalid-id')
      .expect(400);
  });
});