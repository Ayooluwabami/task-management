import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { CustomError } from '../utils/custom-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.stack);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      message: err.message,
      details: err.details,
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      details: err.message,
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid ID format',
    });
  }

  res.status(500).json({
    message: 'Internal Server Error',
  });
};