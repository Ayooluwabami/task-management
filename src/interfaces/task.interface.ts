import { Document } from 'mongoose';

export interface ITask extends Document {
  taskId: number;
  title: string;
  description?: string;
  status: TaskStatus;
  created_at: Date;
  updated_at: Date;
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}