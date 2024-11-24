import httpStatus from "http-status";
import Article from "../models/article.model.js";
import ApiError from "../utils/ApiError.js";
import authorModel from "../models/author.model.js";

/**
 * Create a new article
 * @param {Object} articleBody
 * @returns {Promise<Article>}
 */
export const createArticle = async (articleBody: any) => {
  return Article.create(articleBody);
};

/**
 * Query for articles with optional filters
 * @param {Object} filter - MongoDB filter
 * @param {Object} options - Query options (sort, limit, page)
 * @returns {Promise<QueryResult>}
 */
export const queryArticles = async (filter: any, options: any) => {
  // Process options
  options.sort = options.sortBy || "datePublished";
  options.limit = options.limit ? parseInt(options.limit, 10) : 20;
  options.page = options.page ? parseInt(options.page, 10) : 1;

  // Filtering by Author username
  if (filter.author) {
    const author = await authorModel.findOne({ username: filter.author });
    if (author) {
      filter.author = author._id;
    } else {
      // If author not found, return empty result
      return {
        docs: [],
        totalDocs: 0,
        limit: options.limit,
        page: options.page,
        totalPages: 0,
      };
    }
  }

  const articles = await Article.paginate(filter, options);
  return articles;
};

/**
 * Get article by ID
 * @param {ObjectId} id
 * @returns {Promise<Article | null>}
 */
export const getArticleById = async (id: string) => {
  return Article.findById(id);
};

/**
 * Get article by slug
 * @param {string} slug
 * @returns {Promise<Article | null>}
 */
export const getArticleBySlug = async (slug: string) => {
  return Article.findOne({ slug });
};

/**
 * Update article by ID
 * @param {ObjectId} articleId
 * @param {Object} updateBody
 * @returns {Promise<Article>}
 */
export const updateArticleById = async (articleId: string, updateBody: any) => {
  const article = await getArticleById(articleId);
  if (!article) {
    throw new ApiError(httpStatus.NOT_FOUND, "Article not found");
  }
  Object.assign(article, updateBody);
  await article.save();
  return article;
};

/**
 * Delete article by ID
 * @param {ObjectId} articleId
 * @returns {Promise<Article>}
 */
export const deleteArticleById = async (articleId: string) => {
  const article = await getArticleById(articleId);
  if (!article) {
    throw new ApiError(httpStatus.NOT_FOUND, "Article not found");
  }
  await article.deleteOne();
  return article;
};
