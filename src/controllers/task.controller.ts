import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/task.service';
import { TaskValidator } from '../utils/task.validator';
import { logger } from '../utils/logger';
import { ResponseFormatter } from '../utils/response.formatter';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  public getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('GET /tasks request received', { query: req.query });
      const status = req.query.status as string | undefined;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const { tasks, total } = await this.taskService.getTasks(status, { page, limit });
      res.json(ResponseFormatter.paginated(tasks, total, page, limit));
    } catch (error) {
      logger.error('Error in getTasks', { error });
      next(error);
    }
  };

  public getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('GET /tasks/:id request received', { params: req.params });
      const task = await this.taskService.getTaskById(req.params.id);
      if (!task) {
        return res.status(404).json(ResponseFormatter.error('Task not found'));
      }
      res.json(ResponseFormatter.success(task));
    } catch (error) {
      logger.error('Error in getTaskById', { error });
      next(error);
    }
  };

  public createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('POST /tasks request received', { body: req.body });

      const validationErrors = TaskValidator.validateTask(req.body);
      if (validationErrors.length > 0) {
        return res.status(400).json(ResponseFormatter.validationErrors(validationErrors));
      }

      const task = await this.taskService.createTask(req.body);
      res.status(201).json(ResponseFormatter.success(task, 'Task created successfully'));
    } catch (error) {
      logger.error('Error in createTask', { error });
      next(error);
    }
  };

  public updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('PUT /tasks/:id request received', { params: req.params, body: req.body });

      const validationErrors = TaskValidator.validateTask(req.body);
      if (validationErrors.length > 0) {
        return res.status(400).json(ResponseFormatter.validationErrors(validationErrors));
      }

      const task = await this.taskService.updateTask(req.params.id, req.body);
      if (!task) {
        return res.status(404).json(ResponseFormatter.error('Task not found'));
      }
      res.json(ResponseFormatter.success(task, 'Task updated successfully'));
    } catch (error) {
      logger.error('Error in updateTask', { error });
      next(error);
    }
  };

  public deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('DELETE /tasks/:id request received', { params: req.params });

      const success = await this.taskService.deleteTask(req.params.id);
      if (!success) {
        return res.status(404).json(ResponseFormatter.error('Task not found'));
      }
      res.status(204).send();
    } catch (error) {
      logger.error('Error in deleteTask', { error });
      next(error);
    }
  };
}
