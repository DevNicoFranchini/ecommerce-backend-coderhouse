const admin = true;

const isAdmin = (req, res, next) => {
  if (!admin) {
    res.status(403).json({
      error: -1,
      description: {
        route: req.path,
        method: req.method,
        msg: "Unauthorized",
      },
    });
  } else {
    next();
  }
};

export { isAdmin };
