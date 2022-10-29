import express from "express";
import CartContainer from "./../services/cartContainer.js";

import { completeData } from "./../middleware/validations.js";

const cartContainer = new CartContainer("carts.json");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const carts = await cartContainer.getAll();
    if (carts) {
      return res.status(200).json({
        error: false,
        status: 200,
        body: carts,
      });
    } else {
      res.status(404).json({
        error: true,
        stauts: 404,
        body: "Sorry. The file you are looking for doesn't exist",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const cart = await cartContainer.getById(id);

    if (cart) {
      return res.status(200).json({
        error: false,
        status: 200,
        body: cart,
      });
    } else {
      res.status(404).json({
        error: true,
        stauts: 404,
        body: "Sorry. The product you are looking for doesn't exist",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const cart = await cartContainer.save();

    return res.status(200).json({
      error: false,
      status: 201,
      body: cart,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/products", completeData, async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const cart = await cartContainer.addProduct(id, data);

    return res.status(200).json({
      error: false,
      status: 201,
      body: cart,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const idDeleted = await cartContainer.delete(id);

    return res.status(200).json({
      error: false,
      status: 200,
      body: `ID deleted: ${idDeleted}`,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id/products/:id_prod", async (req, res, next) => {
  try {
    const id = req.params.id;
    const idProd = req.params.id_prod;

    const cart = await cartContainer.deleteProduct(id, idProd);

    return res.status(200).json({
      error: false,
      status: 200,
      body: cart,
    });
  } catch (err) {
    next(err);
  }
});

export { router };
