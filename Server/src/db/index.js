import pg from "pg";
import { DB_HOST, DB_USER, DB_NAME } from '../constants.js';
import dotenv from 'dotenv';

dotenv.config();

const db = new pg.Client({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const connectDb = async () => { 
    try {
        await db.connect();
        console.log('Connected to the database')
    } catch (err) {
        console.error('Error connecting to the database', err )
    }
}
export {db, connectDb}