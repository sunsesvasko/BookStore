const Book = require("./../models/bookModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) return next(new AppError("Book not found!", 404));

  return res.status(200).json(book);
});

exports.getAllBooks = catchAsync(async (req, res, next) => {
  const books = await Book.find();

  return res.status(200).json({
    length: books.length,
    data: books,
  });
});

exports.createBook = catchAsync(async (req, res, next) => {
  if (!req.body.title || !req.body.author || !req.body.publishYear)
    return next(
      new AppError("Send all required fields: title, author, publishYear")
    );

  const newBook = await Book.create(req.body);

  return res.status(201).send(newBook);
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updatedBook) return next(new AppError("Book not found!", 404));

  return res.status(200).json(updatedBook);
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const deletedBook = await Book.findByIdAndDelete(req.params.id);

  if (!deletedBook) return next(new AppError("Book not found!", 404));

  return res.status(204).json(deletedBook);
});
