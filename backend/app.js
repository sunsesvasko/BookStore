// === MODULES === //
const express = require("express");

const bookRoutes = require("./routes/bookRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
// Temp
const Book = require("./models/bookModel");

// === SETUP === //
const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// === ROUTES === //

// View Routes
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to MERN Stack Tutorial");
});

// Book Routes
app.use("/api/books", bookRoutes);

// Other Routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404);
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
