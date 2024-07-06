import getAllBooks from '../services/readAll.services.js';
import getOneBook from '../services/readOne.services.js';
import insertOneBook from '../services/insertAll.services.js';
import deleteBookById from '../services/deleteOne.services.js';
import getSortedBooks from '../services/sort.services.js';
// import updateBookById from '../services/updateOne.services.js';


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
    const { id } = req.params;

    const books = await getOneBook(id);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error server, Controller', error });
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

// export const updateBook = async (req, res) => {
//   try {
//       const { id } = req.params;
//       const bookData = req.body;
//       const result = await updateBookById(id, bookData);
//       res.status(200).json(result);
//   } catch (err) {
//       if (err.message === 'Book not found') {
//           res.status(404).json({ message: 'Book not found' });
//       } else {
//           res.status(500).json({ message: 'Server error' });
//       }
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

export const getSortedBooksController = async () => {
  try {
    // const sortBy = "read_date"
    const {sortBy, order} = req.query 
    const books = await getSortedBooks(sortBy, order)
    res.status(200).json(books)
  } catch (error) {
    res.status(500).json({message: 'Server error'})
  }
}