import pg from "pg";
import dotenv from 'dotenv';

// const { Pool } = pg;

dotenv.config();

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

// const db = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// })

const connectDb = async () => { 
    try {
        await db.connect();
        console.log('Connected to the database')
    } catch (err) {
        console.error('Error connecting to the database', err )
    }
}
export {db, connectDb}