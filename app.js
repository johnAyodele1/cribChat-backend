const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require("./routes/userRoutes");
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use("/users", userRoutes);
module.exports = app;
