import express from "express";
import * as articleController from "../controllers/article.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, articleController.createArticle) // Create a new article
  .get(articleController.getArticles); // Get all articles

router
  .route("/:articleId")
  .get(articleController.getArticleById) // Get an article by ID
  .put(authenticate, articleController.updateArticle) // Update an article
  .delete(authenticate, articleController.deleteArticle); // Delete an article

router.route("/slug/:slug").get(articleController.getArticleBySlug); // Get an article by slug

export default router;
