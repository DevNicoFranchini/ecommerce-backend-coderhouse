import express from "express";
import ProductsContainer from "./../services/productsContainer.js";

import { isAdmin } from "./../middleware/profile.js";
import { completeData } from "./../middleware/validations.js";

const productsContainer = new ProductsContainer("products.json");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await productsContainer.getAll();
    if (products) {
      return res.status(200).json({
        error: false,
        status: 200,
        body: products,
      });
    } else {
      res.status(404).json({
        error: true,
        stauts: 404,
        body: "Sorry. The file you are looking for doesn't exist",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsContainer.getById(id);

    if (product) {
      return res.status(200).json({
        error: false,
        status: 200,
        body: product,
      });
    } else {
      res.status(404).json({
        error: true,
        stauts: 404,
        body: "Sorry. The product you are looking for doesn't exist",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", isAdmin, completeData, async (req, res, next) => {
  try {
    const data = req.body;
    const newProduct = await productsContainer.save(data);

    if (newProduct) {
      return res.status(200).json({
        error: false,
        status: 201,
        body: newProduct,
      });
    } else {
      res.status(404).json({
        error: true,
        stauts: 404,
        body: "Sorry. The product couldn't be created beacuse the file doesn't exist",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;
    await productsContainer.delete(id);
    return res.status(200).json({
      error: false,
      status: 200,
      body: id,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", isAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const product = await productsContainer.updateById(id, data);

    return res.status(200).json({
      error: false,
      status: 200,
      body: product,
    });
  } catch (err) {
    next(err);
  }
});

export { router };
