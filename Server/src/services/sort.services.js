import { db } from "../db/index.js";

async function getSortedBooks(sortBy, order = 'ASC') {
    try {
        let query = `
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
        `;

        if (sortBy === 'read_date') {
            query += ' ORDER BY ratings.read_date ' + order;
        } else if (sortBy === 'rating') {
            query += ' ORDER BY ratings.rating ' + order;
        } else {
            // If no valid sortBy value is provided, sort by book name by default
            query += ' ORDER BY books.name ' + order;
        }

        console.log('Executing query:', query); // Debugging step
        const res = await db.query(query);
        return res.rows;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    }
}

export default getSortedBooks;
