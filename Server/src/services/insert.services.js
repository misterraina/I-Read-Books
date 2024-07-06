import { db } from '../db/db.js';

// Service to insert a new author
const insertAuthor = async (name) => {
    const query = 'INSERT INTO authors (name) VALUES ($1) RETURNING id';
    const result = await db.query(query, [name]);
    return result.rows[0].id;
};

// Service to insert a new book
const insertBook = async (name, author_id, published_date) => {
    const query = 'INSERT INTO books (name, author_id, published_date) VALUES ($1, $2, $3) RETURNING id';
    const result = await db.query(query, [name, author_id, published_date]);
    return result.rows[0].id;
};

// Service to insert a new rating
const insertRating = async (book_id, rating, read_date) => {
    const query = 'INSERT INTO ratings (book_id, rating, read_date) VALUES ($1, $2, $3)';
    await db.query(query, [book_id, rating, read_date]);
};

// Service to insert a new review
const insertReview = async (book_id, review, notes) => {
    const query = 'INSERT INTO reviews (book_id, review, notes) VALUES ($1, $2, $3)';
    await db.query(query, [book_id, review, notes]);
};

// Service to insert a new link
const insertLink = async (book_id, amazon_link, cover_image_api) => {
    const query = 'INSERT INTO links (book_id, amazon_link, cover_image_api) VALUES ($1, $2, $3)';
    await db.query(query, [book_id, amazon_link, cover_image_api]);
};

// Main function to insert all data
const insertAllData = async ({ author_name, book_name, published_date, rating, read_date, review, notes, amazon_link, cover_image_api }) => {
    try {
        const authorId = await insertAuthor(author_name);
        const bookId = await insertBook(book_name, authorId, published_date);

        if (rating && read_date) {
            await insertRating(bookId, rating, read_date);
        }

        if (review || notes) {
            await insertReview(bookId, review, notes);
        }

        if (amazon_link || cover_image_api) {
            await insertLink(bookId, amazon_link, cover_image_api);
        }

        console.log('All data inserted successfully');
    } catch (err) {
        console.error('Error inserting data', err);
    }
};

export { insertAllData };
