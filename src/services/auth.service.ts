import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import ApiError from "../utils/ApiError.js";
import Author from "../models/author.model.js";

/**
 * Register a new author
 * @param {Object} authorBody
 * @returns {Promise<{ author: any; token: string }>}
 */
export const register = async (authorBody: any) => {
  const { fullname, username, password, accountType } = authorBody;

  // Check if the username is already taken
  if (await Author.findOne({ username })) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Username already taken");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the new author
  const author = new Author({
    fullname,
    username,
    password: hashedPassword,
    accountType: accountType || "contributor", // Default to 'contributor' if not provided
  });

  await author.save();

  // Generate JWT token
  const token = jwt.sign({ sub: author.id }, config.jwt.secret, {
    expiresIn: config.jwt.accessExpirationMinutes * 60,
  });

  // Exclude password from the author object
  const authorData = author.toObject();
  delete authorData.password;

  return { author: authorData, token };
};

/**
 * Login an author
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{ author: any; token: string }>}
 */
export const login = async (username: string, password: string) => {
  const author = await Author.findOne({ username }).select("+password");
  if (!author || !(await bcrypt.compare(password, author.password))) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Incorrect username or password"
    );
  }

  // Generate JWT token
  const token = jwt.sign({ sub: author.id }, config.jwt.secret, {
    expiresIn: config.jwt.accessExpirationMinutes * 60,
  });

  // Exclude password from the author object
  const authorData = author.toObject();
  delete authorData.password;

  return { author: authorData, token };
};
