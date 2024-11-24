import express from "express";
import articleRoute from "./article.route.js";
import authorRoute from "./author.route.js";
import authRoute from "./auth.route.js";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/articles",
    route: articleRoute,
  },
  {
    path: "/authors",
    route: authorRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
