import { Task } from './models/task.model';
import { ITask } from './interfaces/task.interface';
import { logger } from './utils/logger';

export class TaskService {
  public async getTasks(status?: string): Promise<ITask[]> {
    const query = status ? { status } : {};
    return await Task.find(query).sort({ created_at: -1 });
  }

  public async getTaskById(id: string): Promise<ITask | null> {
    return await Task.findById(id);
  }

  public async createTask(taskData: Partial<ITask>): Promise<ITask> {
    const task = new Task(taskData);
    return await task.save();
  }

  public async updateTask(id: string, taskData: Partial<ITask>): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(
      id,
      { ...taskData, updated_at: new Date() },
      { new: true, runValidators: true }
    );
  }

  public async deleteTask(id: string): Promise<boolean> {
    const result = await Task.findByIdAndDelete(id);
    return result !== null;
  }
}