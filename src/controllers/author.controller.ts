import httpStatus from "http-status";
import pick from "../utils/pick.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import * as authorService from "../services/author.service.js";

/**
 * Create a new author
 */
export const createAuthor = catchAsync(async (req, res) => {
  const author = await authorService.createAuthor(req.body);
  res.status(httpStatus.CREATED).send(author);
});

/**
 * Get all authors (with conditional filtering)
 */
export const getAuthors = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["fullname", "username", "accountType"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await authorService.queryAuthors(filter, options);
  res.send(result);
});

/**
 * Get author by ID
 */
export const getAuthorById = catchAsync(async (req, res) => {
  const author = await authorService.getAuthorById(req.params.authorId);
  if (!author) {
    throw new ApiError(httpStatus.NOT_FOUND, "Author not found");
  }
  res.send(author);
});

/**
 * Update an author
 */
export const updateAuthor = catchAsync(async (req, res) => {
  const author = await authorService.updateAuthorById(
    req.params.authorId,
    req.body
  );
  res.send(author);
});

/**
 * Delete an author
 */
export const deleteAuthor = catchAsync(async (req, res) => {
  await authorService.deleteAuthorById(req.params.authorId);
  res.status(httpStatus.NO_CONTENT).send();
});
