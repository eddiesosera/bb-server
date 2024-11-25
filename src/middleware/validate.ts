import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

/**
 * Middleware for validating request bodies against a Joi schema
 * @param {ObjectSchema} schema - Joi schema to validate the request body
 */
export const validate =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      // Return a 400 Bad Request error if validation fails
      return next(
        new ApiError(httpStatus.BAD_REQUEST, error.details[0].message)
      );
    }

    next();
  };
