import mongoose, { Schema } from 'mongoose';
import { ITask, TaskStatus } from '../interfaces/task.interface';
import { Counter } from './count.model';

const TaskSchema: Schema = new Schema({
  taskId: {
    type: Number,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.PENDING,
  },
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to handle auto-increment
TaskSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'taskId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.taskId = counter.seq;
  }
  this.updated_at = new Date();
  next();
});

export const Task = mongoose.model<ITask>('Task', TaskSchema);