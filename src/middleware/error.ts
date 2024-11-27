import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import config from "../config/config.js";
import logger from "../config/logger.js";

/**
 * Converts non-ApiError instances into ApiError for consistent error handling
 */
export const errorConverter = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    console.log(req);
    const statusCode =
      (error as any).statusCode || httpStatus.INTERNAL_SERVER_ERROR; // Default to 500 if no statusCode is present
    const message = error.message || httpStatus[statusCode].toString();
    error = new ApiError(statusCode, message, false); // Wrap in ApiError for uniform error structure
  }

  next(error);
};

/**
 * Handles errors by responding with structured error messages and logging
 */
export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;

  // Hide internal error details in production for security
  if (config.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = "Internal Server Error";
  }

  res.status(statusCode).json({
    code: statusCode,
    message,
  });

  if (config.env !== "test") {
    logger.error(err);
  }
};
