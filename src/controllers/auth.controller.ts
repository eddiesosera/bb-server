import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import * as authService from "../services/auth.service.js";
import { Request, Response } from "express";

/**
 * Register a new author
 */
export const register = catchAsync(async (req: Request, res: Response) => {
  const { author, token } = await authService.register(req.body);
  res.status(httpStatus.CREATED).send({ author, token });
});

/**
 * Login an author
 */
export const login = catchAsync(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const { author, token } = await authService.login(username, password);
  res.send({ author, token });
});
