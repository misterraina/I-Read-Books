import { db } from "../db/index.js";

async function getOneBook(bookId) {
    try {
        const res = await db.query(
            `SELECT 
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
            WHERE 
                books.id = $1`, [bookId]);

        return res.rows
    } catch (err) {
        console.error(err);
    }
    //  finally {
    //     client.release();
    // }
}

export default getOneBook