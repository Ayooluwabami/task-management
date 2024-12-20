import { Request } from 'express';
import { TaskStatus } from '../interfaces/task.interface';

export const validateTask = (req: Request): string[] => {
  const errors: string[] = [];
  const { title, description, status } = req.body;

  // Validate title
  if (!title) {
    errors.push('Title is required');
  } else if (title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }

  // Validate description
  if (description && description.length > 500) {
    errors.push('Description must be less than 500 characters');
  }

  // Validate status
  if (status && !Object.values(TaskStatus).includes(status)) {
    errors.push('Invalid status value');
  }

  return errors;
};