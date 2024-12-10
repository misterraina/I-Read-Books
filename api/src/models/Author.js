import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Author = sequelize.define('Author', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    bio: { type: DataTypes.TEXT },
});


export default Author;
