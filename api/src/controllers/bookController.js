// src/controllers/bookController.js

import { Author, Book, Review } from '../models/index.js';

// Add a new book
export const createBook = async (req, res) => {
    try {
        const { name, published_date, cover_image, amazon_link, author, review } = req.body;

        if (!name || !published_date || !cover_image || !amazon_link || !author || !author.name || !review) {
            return res.status(400).json({ error: 'Missing required fields in the request body.' });
        }

        // Check if the author already exists, or create a new one
        let authorInstance = await Author.findOne({ where: { name: author.name } });
        if (!authorInstance) {
            authorInstance = await Author.create(author);
        }

        // Create the book associated with the author
        const book = await Book.create({
            name,
            published_date,
            cover_image,
            amazon_link,
            author_id: authorInstance.id,
        });

        // Create the review associated with the book
        if (review) {
            const createdReview = await Review.create({ 
                ...review, 
                book_id: book.id 
            });

            // Associate review with the book using Sequelize
            await book.addReview(createdReview);
        }

        // Reload the book with associated data (optional)
        const bookWithDetails = await Book.findByPk(book.id, {
            include: [
                { model: Author, attributes: ['name', 'bio'] },
                { model: Review, attributes: ['read_date', 'rating', 'review_desc', 'notes'] },
            ],
        });

        res.status(201).json({ message: 'Book created successfully!', book: bookWithDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating book.' });
    }
};


// Retrieve all books
export const getBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            include: [
                { model: Author, attributes: ['name', 'bio'] },
                { model: Review, attributes: ['read_date', 'rating', 'review_desc', 'notes'] },
            ],
        });

        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving books.' });
    }
};

export const getBooksSorted = async (req, res) => {
    try {
        const { sortBy } = req.query; // The query parameter for sorting

        let order = []; // The order for sorting based on query

        if (sortBy === 'read_date') {
            order = [['Reviews', 'read_date', 'ASC']]; // Sort by read_date in ascending order
        } else if (sortBy === 'rating') {
            order = [['Reviews', 'rating', 'DESC']]; // Sort by rating in descending order
        }

        const books = await Book.findAll({
            include: [
                { model: Author, attributes: ['name', 'bio'] },
                { model: Review, attributes: ['read_date', 'rating', 'review_desc', 'notes'] }
            ],
            order, // Apply the sorting order
        });

        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving books.' });
    }
};

// DELETE /books/:id - Delete a book by ID
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the book by ID
        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Delete the book
        await book.destroy();

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting book' });
    }
};

// PATCH /books/:id - Update a book by ID (partial update)
export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, published_date, cover_image, amazon_link, author, review } = req.body;

        // Find the book by ID
        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Update the book details (only the fields provided)
        if (name) book.name = name;
        if (published_date) book.published_date = published_date;
        if (cover_image) book.cover_image = cover_image;
        if (amazon_link) book.amazon_link = amazon_link;

        // If author is provided, handle it
        if (author) {
            let authorInstance = await Author.findOne({ where: { name: author.name } });
            if (!authorInstance) {
                authorInstance = await Author.create(author);
            }
            book.author_id = authorInstance.id;
        }

        // If review is provided, handle it
        if (review) {
            const existingReview = await Review.findOne({ where: { book_id: book.id } });
            if (existingReview) {
                existingReview.read_date = review.read_date || existingReview.read_date;
                existingReview.rating = review.rating || existingReview.rating;
                existingReview.review_desc = review.review_desc || existingReview.review_desc;
                existingReview.notes = review.notes || existingReview.notes;
                await existingReview.save();
            } else {
                await Review.create({ ...review, book_id: book.id });
            }
        }

        await book.save(); // Save the updated book

        res.status(200).json({ message: 'Book updated successfully', book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating book' });
    }
};