// src/routes/bookRoutes.js

import express from 'express';
import { createBook, getBooks, getBooksSorted, updateBook, deleteBook } from '../controllers/bookController.js'
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /books - Retrieve all books
router.get('/', getBooks);
router.get('/sorted', getBooksSorted);


// PATCH /books/:id - Update a book by ID (partial update)
router.patch('/:id', updateBook);

// POST /books - Add a new book
router.post('/', createBook);

// DELETE /books/:id - Delete a book by ID
router.delete('/:id', deleteBook);

export default router;
