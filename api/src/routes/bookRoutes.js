// src/routes/bookRoutes.js

import express from 'express';
import { createBook, getBooks, getBooksSorted, updateBook, deleteBook } from '../controllers/bookController.js'
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /books - Retrieve all books
router.get('/', getBooks);
router.get('/sorted', getBooksSorted);


// PATCH /books/:id - Update a book by ID (partial update)
router.patch('/:id',verifyAdmin, updateBook);

// POST /books - Add a new book
router.post('/',verifyAdmin, createBook);

// DELETE /books/:id - Delete a book by ID
router.delete('/:id',verifyAdmin, deleteBook);

export default router;
