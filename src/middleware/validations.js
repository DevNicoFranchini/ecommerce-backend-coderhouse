const completeData = (req, res, next) => {
  if (!req.body.name) {
    throw new Error("Name is required");
  }

  if (!req.body.description) {
    throw new Error("Description is required");
  }

  if (!req.body.code) {
    throw new Error("Code is required");
  }

  if (!req.body.thumbnail) {
    throw new Error("Image is required");
  }

  if (!req.body.price) {
    throw new Error("Price is required");
  }

  if (!req.body.stock) {
    throw new Error("Stock is requireds");
  }
  next();
};

export { completeData };
