import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Book = sequelize.define('Book', {
    name: { type: DataTypes.STRING, allowNull: false },
    published_date: { type: DataTypes.DATE },
    cover_image: { type: DataTypes.TEXT },
    amazon_link: { type: DataTypes.TEXT },
});

export default Book;
