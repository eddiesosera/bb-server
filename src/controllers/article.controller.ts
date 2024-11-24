import httpStatus from "http-status";
import pick from "../utils/pick.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import * as articleService from "../services/article.service.js";

/**
 * Create a new article
 */
export const createArticle = catchAsync(async (req: any, res: any) => {
  // Assuming the author is the authenticated user
  req.body.author = req.user.id;
  const article = await articleService.createArticle(req.body);
  res.status(httpStatus.CREATED).send(article);
});

/**
 * Get all articles
 */
export const getArticles = catchAsync(async (req: any, res: any) => {
  const filter = pick(req.query, ["title", "category", "author"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await articleService.queryArticles(filter, options);
  res.send(result);
});

/**
 * Get article by ID
 */
export const getArticleById = catchAsync(async (req: any, res: any) => {
  const article = await articleService.getArticleById(req.params.articleId);
  if (!article) {
    throw new ApiError(httpStatus.NOT_FOUND, "Article not found");
  }
  res.send(article);
});

/**
 * Get article by slug
 */
export const getArticleBySlug = catchAsync(async (req: any, res: any) => {
  const article = await articleService.getArticleBySlug(req.params.slug);
  if (!article) {
    throw new ApiError(httpStatus.NOT_FOUND, "Article not found");
  }
  res.send(article);
});

/**
 * Update an article
 */
export const updateArticle = catchAsync(async (req: any, res: any) => {
  const article = await articleService.updateArticleById(
    req.params.articleId,
    req.body
  );
  res.send(article);
});

/**
 * Delete an article
 */
export const deleteArticle = catchAsync(async (req: any, res: any) => {
  await articleService.deleteArticleById(req.params.articleId);
  res.status(httpStatus.NO_CONTENT).send();
});
