import { Request, Response, NextFunction } from "express";
import passport from "passport";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";

/**
 * Authentication middleware using Passport.js
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: any, author: any, info: any) => {
      if (err || !author) {
        return next(
          new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
        );
      }
      req.user = author;
      next();
    }
  )(req, res, next);
};
