import express from "express";
import articleRoute from "./article.route.js";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/articles",
    route: articleRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
