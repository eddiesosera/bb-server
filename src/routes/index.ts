import express from "express";
import articleRoute from "./article.route.js";
import authorRoute from "./author.route.js";

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
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
