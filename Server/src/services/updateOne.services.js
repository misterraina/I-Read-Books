import { db } from "../db/index.js";

async function updateBookById(bookId, bookData) {
    const client = await db.connect();
    try {
        await client.query('BEGIN');

        const { name, author_id, published_date, rating, read_date, review, notes, amazon_link, cover_image_api } = bookData;

        const updateBook = `
            UPDATE books
            SET name = $1, author_id = $2, published_date = $3
            WHERE id = $4
            RETURNING *`;

        const bookRes = await client.query(updateBook, [name, author_id, published_date, bookId]);
        if (bookRes.rowCount === 0) {
            throw new Error('Book not found');
        }

        if (rating !== undefined || read_date !== undefined) {
            const updateRating = `
                UPDATE ratings
                SET rating = $1, read_date = $2
                WHERE book_id = $3`;
            await client.query(updateRating, [rating, read_date, bookId]);
        }

        if (review !== undefined || notes !== undefined) {
            const updateReview = `
                UPDATE reviews
                SET review = $1, notes = $2
                WHERE book_id = $3`;
            await client.query(updateReview, [review, notes, bookId]);
        }

        if (amazon_link !== undefined || cover_image_api !== undefined) {
            const updateLink = `
                UPDATE links
                SET amazon_link = $1, cover_image_api = $2
                WHERE book_id = $3`;
            await client.query(updateLink, [amazon_link, cover_image_api, bookId]);
        }

        await client.query('COMMIT');
        return { message: 'Book updated successfully' };
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error updating book data', err);
        throw err;
    } 
    // finally {
    //     client.release();
    // }
}

export default updateBookById;
