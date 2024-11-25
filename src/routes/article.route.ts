import express from "express";
import * as articleController from "../controllers/article.controller.js";
import { authenticate } from "../middleware/auth.js";
import { createArticleSchema } from "../validators/article.validators.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router
  .route("/")
  // Create a new article
  .post(
    authenticate,
    validate(createArticleSchema),
    articleController.createArticleController
  )
  .get(articleController.getArticlesController); // Get all articles (with optional filters)

router
  .route("/id/:articleId")
  .get(articleController.getArticleByIdController) // Get an article by ID
  .put(authenticate, articleController.updateArticleController) // Update an article
  .delete(authenticate, articleController.deleteArticleController); // Delete an article

router.route("/:slug").get(articleController.getArticleBySlugController); // Get an article by slug

export default router;
