import dotenv from 'dotenv';
import sequelize from './config/database.js';
import app from './app.js';
import { Author, Book, Review } from './models/index.js';  // Import from models/index.js
import User from './models/User.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected!');

        // Synchronize models with the database
        await sequelize.sync({ alter: true });
        console.log('Tables synchronized!');

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
})();

export default app;