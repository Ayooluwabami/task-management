import { Task } from '../models/task.model';
import { ITask } from '../interfaces/task.interface';
import { logger } from '../utils/logger';
import { QueryBuilder } from '../utils/query.builder';
import { IPaginationOptions, PaginationHelper } from '../utils/pagination';

export class TaskService {
  // Fetch tasks with optional status and pagination.
  public async getTasks(status?: string, pagination?: IPaginationOptions): Promise<{ tasks: ITask[], total: number }> {
    logger.info('Fetching tasks', { status, pagination });
    const query = QueryBuilder.buildStatusQuery(status);
    const { page, limit, skip } = PaginationHelper.getOptions(pagination);

    const [tasks, total] = await Promise.all([
      Task.find(query)
        .sort({ taskId: -1 })
        .skip(skip)
        .limit(limit),
      Task.countDocuments(query)
    ]);

    logger.info('Tasks fetched successfully', { count: tasks.length, total });
    return { tasks, total };
  }

  // Fetch a single task by its ID.
  public async getTaskById(id: string): Promise<ITask | null> {
    logger.info('Fetching task by ID', { id });
    try {
      const task = await Task.findById(id);
      if (!task) {
        logger.warn('Task not found', { id });
      }
      return task;
    } catch (error) {
      logger.error('Error fetching task by ID', { id, error });
      throw new Error('Failed to fetch task.');
    }
  }

  // Create a new task.
  public async createTask(taskData: Partial<ITask>): Promise<ITask> {
    logger.info('Creating task', { taskData });
    try {
      const task = new Task(taskData);
      const savedTask = await task.save();
      logger.info('Task created successfully', { taskId: savedTask._id });
      return savedTask;
    } catch (error) {
      logger.error('Error creating task', { taskData, error });
      throw new Error('Failed to create task.');
    }
  }

  // Update an existing task by its ID.
  public async updateTask(id: string, taskData: Partial<ITask>): Promise<ITask | null> {
    logger.info('Updating task', { id, taskData });
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { ...taskData, updated_at: new Date() },
        { new: true, runValidators: true }
      );
      if (!updatedTask) {
        logger.warn('Task not found for update', { id });
      } else {
        logger.info('Task updated successfully', { id });
      }
      return updatedTask;
    } catch (error) {
      logger.error('Error updating task', { id, taskData, error });
      throw new Error('Failed to update task.');
    }
  }

  // Delete a task by its ID.
  public async deleteTask(id: string): Promise<boolean> {
    logger.info('Deleting task', { id });
    try {
      const result = await Task.findByIdAndDelete(id);
      if (!result) {
        logger.warn('Task not found for deletion', { id });
        return false;
      }
      logger.info('Task deleted successfully', { id });
      return true;
    } catch (error) {
      logger.error('Error deleting task', { id, error });
      throw new Error('Failed to delete task.');
    }
  }
}
