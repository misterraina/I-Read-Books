import Author from './Author.js';
import Book from './Book.js';
import Review from './Review.js';

Author.hasMany(Book, { foreignKey: 'author_id' });
Book.belongsTo(Author, { foreignKey: 'author_id' });
Book.hasMany(Review, { foreignKey: 'book_id' });
Review.belongsTo(Book, { foreignKey: 'book_id' });

export { Author, Book, Review };
