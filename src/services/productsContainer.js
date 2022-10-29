import fs from "fs";
import moment from "moment";

class ProductsContainer {
  constructor(nameFile) {
    this.nameFile = nameFile;
  }

  // Reading file function
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

  // Writing file function
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

  // Saving product function
  save = async (product) => {
    try {
      const data = await this.readFile();

      if (data.length === 0) {
        product.id = 1;
      } else {
        const lastProduct = data[data.length - 1];
        console.log(lastProduct);
        const id = lastProduct.id + 1;

        product.id = id;
      }

      if (!product.stock) {
        product.stock = 0;
      }

      const newProduct = {
        id: product.id,
        timestamp: moment().format("DD/MM/YYYY HH:mm:ss"),
        name: product.name,
        description: product.description,
        code: product.code,
        image: product.image,
        price: product.price,
        stock: product.stock,
      };

      data.push(newProduct);

      await this.writeFile(data);

      return newProduct;
    } catch (err) {
      console.log(err);
    }
  };

  // Getting all products function
  getAll = async () => {
    try {
      const products = await this.readFile();
      return products;
    } catch (err) {
      console.log(err);
    }
  };

  // Getting one product by id function
  getById = async (id) => {
    try {
      const products = await this.readFile();
      const product = products.find((item) => item.id === parseInt(id)) || null;

      if (product) {
        return product;
      } else {
        throw new Error(
          "Sorry. The product you are looking for doesn't exist."
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Updating by id function
  updateById = async (id, body) => {
    try {
      const products = await this.getAll();
      const product = await this.getById(id);

      let updatedProduct = {};

      updatedProduct.id = product.id;
      updatedProduct.timestamp = product.timestamp;
      updatedProduct.name = !body.name ? product.name : body.name;
      updatedProduct.description = !body.description
        ? product.description
        : body.description;
      updatedProduct.code = !body.code ? product.code : body.code;
      updatedProduct.thumbnail = !body.thumbnail
        ? product.thumbnail
        : body.thumbnail;
      updatedProduct.price = !body.price ? product.price : body.price;
      updatedProduct.stock = !body.stock ? product.stock : body.stock;

      const index = products.findIndex((item) => item.id === parseInt(id));
      products[index] = updatedProduct;

      await this.writeFile(products);

      return updatedProduct;
    } catch (err) {
      console.log(err);
    }
  };

  // Deleting all products function
  deleteAll = async () => {
    try {
      const products = [];
      await this.writeFile(products);
    } catch (err) {
      console.log(err);
    }
  };

  // Deleting product by id function
  deleteById = async (id) => {
    try {
      const products = await this.getAll();
      const product = await this.getById(id);

      const index = products.findIndex((item) => item.id === product.id);
      products.splice(index, 1);

      await this.writeFile(products);

      return id;
    } catch (err) {
      console.log(err);
    }
  };
}

export default ProductsContainer;
