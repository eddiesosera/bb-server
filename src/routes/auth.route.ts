import express from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login); // Login route - no valiation
router.post("/register", register); // Register route - no validation

export default router;
