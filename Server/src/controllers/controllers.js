import getAllBooks from '../services/readAll.services.js';
import getOneBook from '../services/readOne.services.js';
import insertOneBook from '../services/insertAll.services.js';
import deleteBookById from '../services/deleteOne.services.js';
import getSortedBooks from '../services/sort.services.js';
import { updateBookCompletely } from '../services/updatePut.services.js';


export const createBook = async (req, res) => {
  try {
    const bookData = req.body
    const newBook = await insertOneBook(bookData);
    res.status(201).json({
      message: `Dummy data inserted Successfully`
    });
  } catch (error) {
    res.status(500).json({ message: 'Error saving book', error });
  }
};


export const getBook = async (req, res) => {
  try {
    const { id } = req.params; // Assuming book ID is in the URL parameters
    const book = await getOneBook(id);
    res.status(200).json(book);
  } catch (error) {
    console.error('Error in getBook Controller:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error server, Controller', error });
  }
};

export const deleteBook = async (req, res) => {
  try {
      const { id } = req.params;

      const result = await deleteBookById(id);
      res.status(200).json(result);
  } catch (err) {
      if (err.message === 'Book not found') {
          res.status(404).json({ message: 'Book not found' });
      } else {
          res.status(500).json({ message: 'Server error' });
      }
  }
};


export async function putBook(req, res) {
  try {
      const bookId = req.params.id;
      const bookData = req.body;
      await updateBookCompletely(bookId, bookData);
      res.status(200).json({ message: 'Book updated successfully' });
  } catch (err) {
      console.error('Error updating book:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
}

export const getSortedBooksController = async (req, res) => {
  try {
    const {sortBy, order} = req.query 
    const books = await getSortedBooks(sortBy, order)
    res.status(200).json(books)
  } catch (error) {
    console.error('Error in getSortedBooksController:', error);
    res.status(500).json({message: 'Server error'})
  }
}