const express = require("express");
const urlRoutes = require("./routes/urlRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

app.use(express.json());

app.use("/api/url", urlRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use(errorMiddleware);

module.exports = app;
