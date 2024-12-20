import { ITask, TaskStatus } from '../interfaces/task.interface';
import { logger } from './logger';

export class TaskValidator {
  static validateTask(taskData: Partial<ITask>): string[] {
    const errors: string[] = [];
    logger.debug('Validating task data', { taskData });

    this.validateTitle(errors, taskData.title);
    this.validateDescription(errors, taskData.description);
    this.validateStatus(errors, taskData.status);

    if (errors.length > 0) {
      logger.warn('Task validation failed', { errors });
    }

    return errors;
  }

  private static validateTitle(errors: string[], title?: string): void {
    if (!title) {
      errors.push('Title is required');
    } else if (title.length > 100) {
      errors.push('Title must be less than 100 characters');
    }
  }

  private static validateDescription(errors: string[], description?: string): void {
    if (description && description.length > 500) {
      errors.push('Description must be less than 500 characters');
    }
  }

  private static validateStatus(errors: string[], status?: TaskStatus): void {
    if (status && !Object.values(TaskStatus).includes(status as TaskStatus)) {
      errors.push('Invalid status value');
    }
  }
}