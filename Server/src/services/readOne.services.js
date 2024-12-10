import { db } from "../db/index.js";

async function getOneBook(bookId) {
    try {
        // Ensure bookId is parsed as an integer
        bookId = parseInt(bookId, 10);

        // Validate bookId is a number
        if (isNaN(bookId)) {
            throw new Error('Invalid book ID');
        }

        const query = `
            SELECT 
                books.id AS book_id,
                books.name AS book_name,
                authors.name AS author_name,
                books.published_date,
                ratings.rating,
                ratings.read_date,
                reviews.review,
                reviews.notes,
                links.amazon_link,
                links.cover_image_api
            FROM 
                books
            JOIN 
                authors ON books.author_id = authors.id
            LEFT JOIN 
                ratings ON books.id = ratings.book_id
            LEFT JOIN 
                reviews ON books.id = reviews.book_id
            LEFT JOIN 
                links ON books.id = links.book_id
            WHERE books.id = $1
        `;

        const res = await db.query(query, [bookId]);
        return res.rows[0];
    } catch (err) {
        console.error('Error executing getOneBook query:', err);
        throw err;
    }
}

export default getOneBook;
