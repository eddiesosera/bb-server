import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import Author from "../models/author.model.js";
import config from "../config/config.js";

export const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  const author = await Author.findOne({ username });
  if (!author || !(await bcrypt.compare(password, author.password))) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Incorrect username or password"
    );
  }

  const token = jwt.sign({ sub: author.id }, config.jwt.secret, {
    expiresIn: config.jwt.accessExpirationMinutes * 60,
  });

  res.send({ token });
});
