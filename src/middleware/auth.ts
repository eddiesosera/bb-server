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
    (err: any, user: any, info: any) => {
      if (err || !user) {
        return next(
          new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
        );
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};
