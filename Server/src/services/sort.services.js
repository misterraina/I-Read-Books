import {db} from '../db/index.js';

async function getSortedBooks(sortBy = 'rating', order = 'ASC') {
    try {
        const validSortBy = ['read_date', 'rating'];
        const validOrder = ['ASC', 'DESC'];

        // Validate sortBy and order values
        if (!validSortBy.includes(sortBy)) {
            sortBy = 'rating';
        }
        if (!validOrder.includes(order)) {
            order = 'ASC';
        }

        // Determine the sorting column
        const sortColumn = sortBy === 'read_date' ? 'ratings.read_date' : 'ratings.rating::NUMERIC';
        
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
            ORDER BY ${sortColumn} ${order}
        `;

        // console.log('Executing query:', query); // Debugging step
        const res = await db.query(query);
        return res.rows;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    }
}

export default getSortedBooks;
