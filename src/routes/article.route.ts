import express from "express";
import * as articleController from "../controllers/article.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, articleController.createArticleController) // Create a new article
  .get(articleController.getArticlesController); // Get all articles (with optional filters)

router
  .route("/id/:articleId")
  .get(articleController.getArticleByIdController) // Get an article by ID
  .put(authenticate, articleController.updateArticleController) // Update an article
  .delete(authenticate, articleController.deleteArticleController); // Delete an article

router.route("/:slug").get(articleController.getArticleBySlugController); // Get an article by slug

export default router;
