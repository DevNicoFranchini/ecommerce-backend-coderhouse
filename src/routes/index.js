import express from "express";

import { router as productsRoutes } from "./productsRoutes.js";
import { router as cartRoutes } from "./cartRoutes.js";

const router = express.Router();
const apiRouter = (app) => {
  app.use("/api", router);
  router.use("/products", productsRoutes);
  router.use("/cart", cartRoutes);

  // Ruta inexistente
  app.use("*", async (req, res, next) => {
    res.status(404).json({
      error: -2,
      description: {
        route: req.path,
        method: req.method,
        msg: "Not implemented",
      },
    });
  });
};

export { apiRouter };
