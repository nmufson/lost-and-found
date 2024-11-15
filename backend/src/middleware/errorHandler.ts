import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

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

const errorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      message: err.message,
      details: err.details || 'No additional details',
    });
  }

  console.error(err);
  res.status(500).json({
    message: 'An unexpected error occurred',
  });
};

export default errorHandler;
