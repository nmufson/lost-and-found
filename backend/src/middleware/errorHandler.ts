class CustomError extends Error {
  statusCode: number;
  details?: string;

  constructor(message: string, statusCode: number, details?: string) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = this.constructor.name;
  }
}

import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      message: err.message,
      details: err.details || 'No additional details',
    });
  }

  console.error(err);
  return res.status(500).json({
    message: 'An unexpected error occurred',
  });
};

export default errorHandler;
