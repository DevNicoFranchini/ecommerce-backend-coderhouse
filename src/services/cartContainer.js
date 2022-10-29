import fs from "fs";
import moment from "moment";

import ProductsContainer from "./productsContainer.js";

const productsContainer = new ProductsContainer("products.json");

class CartContainer {
  constructor(nameFile) {
    this.nameFile = nameFile;
  }

  readFile = async () => {
    try {
      const data = await fs.promises.readFile(
        `./src/db/${this.nameFile}`,
        "utf-8"
      );
      return JSON.parse(data);
    } catch (err) {
      console.log(err);
    }
  };

  writeFile = async (data) => {
    try {
      await fs.promises.writeFile(
        `./src/db/${this.nameFile}`,
        JSON.stringify(data)
      );
      return true;
    } catch (err) {
      console.log(err);
    }
  };

  getAll = async () => {
    try {
      const cart = await this.readFile();
      return cart;
    } catch (err) {
      console.log(err);
    }
  };

  getById = async (id) => {
    try {
      const data = await this.readFile();
      const cart = data.find((item) => item.id === parseInt(id)) || null;

      if (!cart) {
        throw new Error("Cart does not exist");
      }

      return cart;
    } catch (err) {
      console.log(err);
    }
  };

  save = async () => {
    try {
      const newCart = {};
      const data = await this.readFile();

      if (data.length === 0) {
        newCart.id = 1;
      } else {
        const lastCart = data[data.length - 1];
        const id = lastCart.id + 1;

        newCart.id = id;
      }

      newCart.timestamp = moment().format("DD/MM/YYYY HH:mm:ss");
      newCart.products = [];

      data.push(newCart);

      await this.writeFile(data);

      return newCart;
    } catch (err) {
      console.log(err);
    }
  };

  addProduct = async (id, data) => {
    try {
      const carts = await this.getAll();
      const cart = await this.getById(id);

      const idProducto = data.id;
      const product = await productsContainer.getById(idProducto);

      if (product.stock > 0) {
        cart.products.push(product);
      } else {
        throw new Error("insufficient stock");
      }

      const index = carts.findIndex((item) => item.id === cart.id);
      carts[index] = cart;

      await this.writeFile(carts);

      return cart;
    } catch (err) {
      console.log(err);
    }
  };

  deleteProduct = async (idCart, idProduct) => {
    try {
      const cart = await this.getById(idCart);
      const productInCart = cart.products.find(
        (item) => item.id === parseInt(idProduct) || null
      );

      if (!productInCart) {
        throw error("The product does not exist in the cart", 400);
      }

      const index = cart.products.findIndex(
        (item) => item.id === parseInt(idProduct)
      );
      cart.products.splice(index, 1);

      const carts = await this.getAll();
      const indexCart = carts.findIndex((item) => item.id === parseInt(idCart));

      carts[indexCart] = cart;

      await this.writeFile(carts);

      return cart;
    } catch (err) {
      console.log(err);
    }
  };

  delete = async (id) => {
    try {
      const cart = await this.getById(id);
      const list = await this.getAll();

      const index = list.findIndex((item) => item.id === cart.id);
      list.splice(index, 1);

      await this.writeFile(list);

      return id;
    } catch (err) {
      console.log(err);
    }
  };
}

export default CartContainer;
