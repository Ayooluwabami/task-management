import request from 'supertest';
import { app } from '../../src/app.module';
import { Task } from '../../src/models/task.model';
import { TaskStatus } from '../../src/interfaces/task.interface';

describe('GET /tasks', () => {
  beforeEach(async () => {
    await Task.deleteMany({});
  });

  it('should return all tasks', async () => {
    const tasks = await Task.create([
      { title: 'Task 1', status: TaskStatus.PENDING },
      { title: 'Task 2', status: TaskStatus.IN_PROGRESS },
      { title: 'Task 3', status: TaskStatus.COMPLETED },
    ]);

    const response = await request(app)
      .get('/tasks')
      .expect(200);

    expect(response.body).toHaveLength(3);
    expect(response.body[0].title).toBe(tasks[0].title);
  });

  it('should filter tasks by status', async () => {
    await Task.create([
      { title: 'Task 1', status: TaskStatus.PENDING },
      { title: 'Task 2', status: TaskStatus.IN_PROGRESS },
      { title: 'Task 3', status: TaskStatus.COMPLETED },
    ]);

    const response = await request(app)
      .get('/tasks')
      .query({ status: TaskStatus.PENDING })
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].status).toBe(TaskStatus.PENDING);
  });
});