import express from "express";
import * as authorController from "../controllers/author.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

/**
 * Routes that require authentication can be protected using the 'authenticate' middleware.
 */

router
  .route("/")
  .post(authorController.createAuthor) // Create a new author
  .get(authorController.getAuthors); // Get all authors

router
  .route("/:authorId")
  .get(authorController.getAuthorById) // Get an author by ID
  .put(authenticate, authorController.updateAuthor) // Update an author
  .delete(authenticate, authorController.deleteAuthor); // Delete an author

export default router;
