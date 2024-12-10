// services/updatePut.services.js

import { db } from "../db/index.js";

export const updateBookCompletely = async (bookId, bookData) => {
  const { authorName, bookName, publishedDate, rating, readDate, review, notes, amazonLink, coverImageApi } = bookData;

  try {
    await db.query('BEGIN');

    // Update author
    await db.query(`
      UPDATE authors 
      SET name = $1
      WHERE id = (
        SELECT author_id
        FROM books
        WHERE id = $2
      )
    `, [authorName, bookId]);

    // Update book
    await db.query(`
      UPDATE books
      SET name = $1, published_date = $2
      WHERE id = $3
    `, [bookName, publishedDate, bookId]);

    // Update rating
    await db.query(`
      UPDATE ratings
      SET rating = $1, read_date = $2
      WHERE book_id = $3
    `, [rating, readDate, bookId]);

    // Update review and notes
    await db.query(`
      UPDATE reviews
      SET review = $1, notes = $2
      WHERE book_id = $3
    `, [review, notes, bookId]);

    // Update link
    await db.query(`
      UPDATE links
      SET amazon_link = $1, cover_image_api = $2
      WHERE book_id = $3
    `, [amazonLink, coverImageApi, bookId]);

    await db.query('COMMIT');
    console.log(`Book with ID ${bookId} updated successfully`);
  } catch (err) {
    await db.query('ROLLBACK');
    console.error('Error updating book:', err);
    throw err;
  }
};
