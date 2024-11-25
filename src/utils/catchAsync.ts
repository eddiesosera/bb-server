import { NextFunction, Request, Response } from "express";

/**
 * Catches errors in async functions and passes them to the next middleware
 */
const catchAsync =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    // Ensures any errors in the promise chain are passed to the next middleware
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

export default catchAsync;
