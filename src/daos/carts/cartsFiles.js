import { CartContainer } from "./../../services/cartContainer.js";

class FilesDaoCarts extends CartContainer {
  constructor(filename) {
    super(filename);
  }
}

export { FilesDaoCarts };
