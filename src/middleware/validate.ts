import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

export const validate =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(
        new ApiError(httpStatus.BAD_REQUEST, error.details[0].message)
      );
    }
    next();
  };
