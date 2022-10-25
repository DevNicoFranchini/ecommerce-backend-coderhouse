// Import modules.
import express from "express";

const app = express();

// Define local and production port.
const PORT = process.env.PORT || 8080;

// Initialize express server.
const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);
server.on("error", (err) =>
  console.log(`There was a problem in the server. Error: ${err}`)
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
