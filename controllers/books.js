const Book = require("../models/Book");
const { StatusCodes } = require("http-status-codes");

const getAllBooks = async (req, res) => {
  const books = await Book.find().sort("createdAt");
  res.status(StatusCodes.OK).json({ count: books.length, books });
};

const getBook = async (req, res) => {
  res.send("get Book");
};

const createBook = async (req, res) => {
  req.body.createdBy = req.user.userId;
  console.log(req.body.createdBy);
  const book = await Book.create(req.body);
  console.log(book);
  res.status(StatusCodes.CREATED).json({ book });
};

const updateBook = async (req, res) => {
  res.send("update Book");
};

const deleteBook = async (req, res) => {
  res.send("delete Book");
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
