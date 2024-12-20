import request from 'supertest';
import { app } from '../../src/app.module';
import { Task } from '../../src/models/task.model';
import { TaskStatus } from '../../src/interfaces/task.interface';

describe('POST /tasks', () => {
  beforeEach(async () => {
    await Task.deleteMany({});
  });

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
    expect(response.body.created_at).toBeDefined();
    expect(response.body.updated_at).toBeDefined();
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

  it('should return 400 for invalid status', async () => {
    const taskWithInvalidStatus = {
      title: 'Test Task',
      status: 'invalid_status',
    };

    const response = await request(app)
      .post('/tasks')
      .send(taskWithInvalidStatus)
      .expect(400);

    expect(response.body.errors).toContain('Invalid status value');
  });
});