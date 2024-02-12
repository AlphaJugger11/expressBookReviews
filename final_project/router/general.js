const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 1: Getting the list of books available in the shop
public_users.get('/', function (req, res) {
  const formattedBooks = JSON.stringify(books, null, 2);
  return res.status(200).json({ books: formattedBooks });
});

// Task 2: Getting book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books.find((b) => b.isbn === isbn);

  if (book) {
    return res.status(200).json({ book });
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Task 3: Getting book details based on the author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const booksByAuthor = books.filter((b) => b.author === author);

  if (booksByAuthor.length > 0) {
    return res.status(200).json({ books: booksByAuthor });
  } else {
    return res.status(404).json({ message: "Books by author not found" });
  }
});

// Task 4: Getting book details based on the title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title.toLowerCase();
  const booksByTitle = books.filter((b) => b.title.toLowerCase().includes(title));

  if (booksByTitle.length > 0) {
    return res.status(200).json({ books: booksByTitle });
  } else {
    return res.status(404).json({ message: "Books with title not found" });
  }
});

// Task 5: Getting book reviews based on ISBN
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books.find((b) => b.isbn === isbn);

  if (book && book.review) {
    return res.status(200).json({ review: book.review });
  } else {
    return res.status(404).json({ message: "Review not found for the book" });
  }
});

// Task 6: Registering a new user
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!isValid(username)) {
    users.push({ username, password });
    return res.status(201).json({ message: "User registered successfully" });
  } else {
    return res.status(400).json({ message: "Username is already taken" });
  }
});

module.exports.general = public_users;
