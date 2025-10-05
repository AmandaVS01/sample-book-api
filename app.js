const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory data store
let books = [
  {
    id: 1,
    title: "Book One",
    author: "Author A",
    isbn: "123-4567890123",
    description: "The first book in the collection."
  },
  {
    id: 2,
    title: "Book Two",
    author: "Author B",
    isbn: "456-7890123456",
    description: "The second book, full of adventure."
  }
];

// GET all books
app.get('/books', (req, res) => {
  try {
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET a single book by id
app.get('/books/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid book ID' });
    const book = books.find(b => b.id === id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST a new book
app.post('/books', (req, res) => {
  try {
    const { title, author, isbn, description } = req.body;
    if (!title || !author || !isbn) {
      return res.status(400).json({ message: 'Missing required fields: title, author, or isbn' });
    }
    const newBook = {
      id: books.length ? (books[books.length - 1].id + 1) : 1,
      title,
      author,
      isbn,
      description: description || ""
    };
    books.push(newBook);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PUT update a book
app.put('/books/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid book ID' });
    const { title, author, isbn, description } = req.body;
    if (!title || !author || !isbn) {
      return res.status(400).json({ message: 'Missing required fields: title, author, or isbn' });
    }
    const book = books.find(b => b.id === id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    book.title = title;
    book.author = author;
    book.isbn = isbn;
    book.description = description || "";
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid book ID' });
    const bookIndex = books.findIndex(b => b.id === id);
    if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });
    const deleted = books.splice(bookIndex, 1);
    res.json(deleted[0]);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Catch-all error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`REST API listening at http://localhost:${port}`);
});