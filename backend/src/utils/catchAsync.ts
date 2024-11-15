import { Request, Response, NextFunction } from 'express';

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

const catchAsync = (controllerFunc: AsyncController) => {
  return function (req: Request, res: Response, next: NextFunction): void {
    controllerFunc(req, res, next).catch(next);
  };
};

export default catchAsync;
