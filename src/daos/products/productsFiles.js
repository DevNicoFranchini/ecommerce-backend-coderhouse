import { ProductsContainer } from "./../../services/productsContainer.js";

class FilesDaoProducts extends ProductsContainer {
  constructor(filename) {
    super(filename);
  }
}

export { FilesDaoProducts };
