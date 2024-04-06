const Book = require("./../models/bookModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.createBook = catchAsync(async (req, res, next) => {
  if (!req.body.title || !req.body.author || !req.body.publishYear) {
    return next(
      new AppError(
        "Please provide a title, author and year of publishment",
        400
      )
    );
  }

  const newBook = await Book.create(req.body);

  res.status(201).json({
    staus: "success",
    user: newBook,
  });
});
