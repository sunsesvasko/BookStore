const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A book needs a title!"],
    },
    author: {
      type: String,
      required: [true, "A book needs an author!"],
    },
    publishYear: {
      type: String,
      required: [true, "A book needs a publish year!"],
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
