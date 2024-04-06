// === MODULES === //
const express = require("express");

// const bookRoutes = require("./routes/bookRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
// Temp
const Book = require("./models/bookModel");

// === SETUP === //
const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// === ROUTES === //
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to MERN Stack Tutorial");
});

// app.use("/api/books", bookRoutes);

// Create Book POST request
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newBook = await Book.create(req.body);

    return res.status(201).send(newBook);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Get All Books from DB | GET request
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();

    return res.status(201).json({
      length: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Get Book by ID from DB | GET request
app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById({ _id: req.params.id });

    if (!book) return res.status(400).send({ message: "Book not found!" });

    return res.status(201).json(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404);
});

app.use(globalErrorHandler);

module.exports = app;
