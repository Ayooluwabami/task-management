import { Request, Response, NextFunction } from 'express';
import { TaskService } from './app.service';
import { validateTask } from './middleware/validation.middleware';
import { logger } from './utils/logger';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  public getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = req.query.status as string | undefined;
      const tasks = await this.taskService.getTasks(status);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  };

  public getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await this.taskService.getTaskById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  };

  public createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationErrors = validateTask(req);
      if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
      }

      const task = await this.taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  };

  public updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationErrors = validateTask(req);
      if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
      }

      const task = await this.taskService.updateTask(req.params.id, req.body);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  };

  public deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const success = await this.taskService.deleteTask(req.params.id);
      if (!success) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}