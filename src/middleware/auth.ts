import { Request, Response, NextFunction } from "express";
import passport from "passport";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";

/**
 * Middleware for authenticating requests using Passport's JWT strategy
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false }, // Disable session management for stateless authentication
    (err: any, author: any, info: any) => {
      if (err || !author) {
        return next(
          new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
        );
      }
      req.user = author; // Attach authenticated user to the request object
      next();
    }
  )(req, res, next);
};
