import { db } from "../db/index.js";


async function deleteBookById(bookId) {
    try {
        const res = await db.query(
            `DELETE FROM books WHERE id = $1 RETURNING *`, [bookId]);

        if (res.rowCount === 0) {
            throw new Error('Book not found');
        }

        return { message: 'Book deleted successfully' };
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export default deleteBookById;
