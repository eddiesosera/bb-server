import httpStatus from "http-status";
import pick from "../utils/pick.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import * as articleService from "../services/article.service.js";
import { generateSlug } from "../utils/slugify.js";

/**
 * Create a new article
 */
export const createArticleController = catchAsync(
  async (req: any, res: any) => {
    const { title } = req.body;
    const slug = await generateSlug(title);

    const articleData = {
      ...req.body,
      slug,
      author: req.user.id,
    };

    const article = await articleService.createArticle(articleData);
    res.status(httpStatus.CREATED).send(article);
  }
);

/**
 * Get all articles (with conditional filtering)
 */
export const getArticlesController = catchAsync(async (req: any, res: any) => {
  const filter = pick(req.query, ["title", "category", "author"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await articleService.queryArticles(filter, options);
  res.send(result);
});

/**
 * Get article by ID
 */
export const getArticleByIdController = catchAsync(
  async (req: any, res: any) => {
    const article = await articleService.getArticleById(req.params.articleId);
    if (!article) {
      throw new ApiError(httpStatus.NOT_FOUND, "Article not found");
    }
    res.send(article);
  }
);

/**
 * Get article by slug
 */
export const getArticleBySlugController = catchAsync(
  async (req: any, res: any) => {
    const { slug } = req.params;
    const article = await articleService.getArticleBySlug(slug);
    if (!article) {
      throw new ApiError(httpStatus.NOT_FOUND, "Article not found");
    }
    res.send(article);
  }
);

/**
 * Update an article
 */
export const updateArticleController = catchAsync(
  async (req: any, res: any) => {
    const article = await articleService.updateArticleById(
      req.params.articleId,
      req.body
    );
    res.send(article);
  }
);

/**
 * Delete an article
 */
export const deleteArticleController = catchAsync(
  async (req: any, res: any) => {
    await articleService.deleteArticleById(req.params.articleId);
    res.status(httpStatus.NO_CONTENT).send();
  }
);
