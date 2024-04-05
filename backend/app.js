// MODULES
const express = require("express");

const bookRoutes = require("./routes/bookRoutes");

const app = express();

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to MERN Stack Tutorial");
});

app.use("/books", bookRoutes);

// Route to create a book
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || req.body.author || req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book;
  } catch (err) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

module.exports = app;
