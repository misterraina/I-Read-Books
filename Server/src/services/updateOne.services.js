// src/services/bookService.js
import { db } from "../db/index.js";

export async function updateBook(bookId, bookData) {
    const { authorName, bookName, publishedDate, rating, readDate, review, notes, amazonLink, coverImageApi } = bookData;

    try {
        await db.query('BEGIN');

        let authorId;
        if (authorName) {
            const authorResult = await db.query(`
                INSERT INTO authors (name) 
                VALUES ($1) 
                ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
                RETURNING id
            `, [authorName]);
            authorId = authorResult.rows[0].id;
        }

        if (bookName || authorId || publishedDate) {
            const updateBookQuery = `
                UPDATE books 
                SET 
                    ${bookName ? 'name = $1,' : ''}
                    ${authorId ? 'author_id = $2,' : ''}
                    ${publishedDate ? 'published_date = $3,' : ''}
                WHERE id = $4
            `.replace(/,\s*WHERE/, ' WHERE');

            await db.query(updateBookQuery, [
                bookName, 
                authorId, 
                publishedDate, 
                bookId
            ].filter(Boolean));
        }

        if (rating || readDate) {
            await db.query(`
                UPDATE ratings 
                SET 
                    ${rating ? 'rating = $1,' : ''}
                    ${readDate ? 'read_date = $2,' : ''}
                WHERE book_id = $3
            `.replace(/,\s*WHERE/, ' WHERE'), [
                rating, 
                readDate, 
                bookId
            ].filter(Boolean));
        }

        if (review || notes) {
            await db.query(`
                UPDATE reviews 
                SET 
                    ${review ? 'review = $1,' : ''}
                    ${notes ? 'notes = $2,' : ''}
                WHERE book_id = $3
            `.replace(/,\s*WHERE/, ' WHERE'), [
                review, 
                notes, 
                bookId
            ].filter(Boolean));
        }

        if (amazonLink || coverImageApi) {
            await db.query(`
                UPDATE links 
                SET 
                    ${amazonLink ? 'amazon_link = $1,' : ''}
                    ${coverImageApi ? 'cover_image_api = $2,' : ''}
                WHERE book_id = $3
            `.replace(/,\s*WHERE/, ' WHERE'), [
                amazonLink, 
                coverImageApi, 
                bookId
            ].filter(Boolean));
        }

        await db.query('COMMIT');
        console.log('Book data updated successfully');
    } catch (err) {
        await db.query('ROLLBACK');
        console.error('Error updating book data', err);
        throw err;
    }
}
