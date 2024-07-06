import * as bookService from '../services/bookService.js';

export const createBook = async (req, res) => {
  // const { title, author, rating, review } = req.body;
  try {
    const newBook = await bookService.createBook(title, author, rating, review);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error saving book', error });
  }
};

// export const getBooks = async (req, res) => {
//   try {
//     const books = await bookService.getBooks();
//     res.status(200).json(books);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving books', error });
//   }
// };

// export const sortBooks = async (req, res) => {
//   const { sortKey } = req.query;
//   try {
//     const books = await bookService.sortBooks(sortKey);
//     res.status(200).json(books);
//   } catch (error) {
//     res.status(500).json({ message: 'Error sorting books', error });
//   }
// };
