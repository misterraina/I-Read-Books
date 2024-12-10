import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Review = sequelize.define('Review', {
    read_date: { type: DataTypes.DATE },
    rating: { type: DataTypes.SMALLINT, allowNull: false, validate: { min: 1, max: 10 } },
    review_desc: { type: DataTypes.TEXT },
    notes: { type: DataTypes.TEXT },
});


export default Review;
