import { db } from "../db/index.js";

const insertOneBook = async (bookData) => {

  const {authorName, bookName, publishedDate, rating, readDate, review, notes,amazonLink, coverImageApi} = bookData

  try {
    // Begin transaction
    await db.query('BEGIN');

    // Insert one author
    const authorResult = await db.query(`
      INSERT INTO authors (name) 
      VALUES ($1) 
      RETURNING id
    `, [authorName]);
    const authorId = authorResult.rows[0].id
    

    // Insert one book
    const bookResult = await db.query(`
      INSERT INTO books (name, author_id, published_date) 
      VALUES ($1, $2, $3) 
      RETURNING id
    `, [bookName, authorId, publishedDate]);
    const bookId = bookResult.rows[0].id

    // Insert one rating
    await db.query(`
      INSERT INTO ratings (book_id, rating, read_date) 
      VALUES ($1, $2, $3)
    `, [bookId, rating, readDate]);

    // Insert one review 
    await db.query(`
    INSERT INTO reviews (book_id, review, notes) 
    VALUES ($1, $2, $3)
    `, [bookId, review, notes]);


    // Insert one link
    await db.query(`
      INSERT INTO links (book_id, amazon_link, cover_image_api) 
      VALUES ($1, $2, $3)
    `, [bookId, amazonLink, coverImageApi]);


    // Commit transaction
    await db.query('COMMIT');
    console.log('Dummy data inserted successfully');
  } catch (err) {
    // Rollback transaction on error
    await db.query('ROLLBACK');
    console.error('Error inserting dummy data', err);
    throw err; // 
  }
  //  finally {
  //   // Always end the database connection
  //   await db.end();
  // }
};

export default insertOneBook;
