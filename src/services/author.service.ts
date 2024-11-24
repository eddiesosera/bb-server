import httpStatus from "http-status";
import Author from "../models/author.model.js";
import ApiError from "../utils/ApiError.js";

/**
 * Create a new author
 * @param {Object} authorBody
 * @returns {Promise<Author>}
 */
export const createAuthor = async (authorBody: any) => {
  if (await Author.findOne({ username: authorBody.username })) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Username already taken");
  }
  const author = new Author(authorBody);
  await author.save();
  return author;
};

/**
 * Query for authors
 * @param {Object} filter - MongoDB filter
 * @param {Object} options - Query options (sort, limit, page)
 * @returns {Promise<QueryResult>}
 */
export const queryAuthors = async (filter: any, options: any) => {
  const authors = await Author.paginate(filter, options);
  return authors;
};

/**
 * Get author by ID
 * @param {ObjectId} id
 * @returns {Promise<Author | null>}
 */
export const getAuthorById = async (id: string) => {
  return Author.findById(id);
};

/**
 * Get author by username
 * @param {string} username
 * @returns {Promise<Author | null>}
 */
export const getAuthorByUsername = async (username: string) => {
  return Author.findOne({ username });
};

/**
 * Update author by ID
 * @param {ObjectId} authorId
 * @param {Object} updateBody
 * @returns {Promise<Author>}
 */
export const updateAuthorById = async (authorId: string, updateBody: any) => {
  const author = await getAuthorById(authorId);
  if (!author) {
    throw new ApiError(httpStatus.NOT_FOUND, "Author not found");
  }
  if (
    updateBody.username &&
    (await Author.findOne({
      username: updateBody.username,
      _id: { $ne: authorId },
    }))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Username already taken");
  }
  Object.assign(author, updateBody);
  await author.save();
  return author;
};

/**
 * Delete author by ID
 * @param {ObjectId} authorId
 * @returns {Promise<Author>}
 */
export const deleteAuthorById = async (authorId: string) => {
  const author = await getAuthorById(authorId);
  if (!author) {
    throw new ApiError(httpStatus.NOT_FOUND, "Author not found");
  }
  await author.deleteOne();
  return author;
};
