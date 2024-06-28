// === MODULES === //
const express = require("express");
const cors = require("cors");
const path = require("path");

const bookRoutes = require("./routes/bookRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
// Temp
const Book = require("./models/bookModel");

// === SETUP === //
const app = express();

// Middleware for parsing req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Middleware for handling CORS Policy
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PATCH", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.use(cors());

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

// PRODUCTION
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
}

module.exports = app;
