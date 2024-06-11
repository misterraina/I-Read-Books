import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import db from './config/db.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
db.connect()

app.get('/books', async(req, res) => {
    try {
        const result = await db.query('SELECT * FROM books');
        res.json(result.rows);
    } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
      }  });
      
app.get('/author', async(req, res) => {
    try {
        const result = await db.query('SELECT * FROM authors');
        res.json(result.rows);
    } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
      }  });

app.get('/amazon_links', async(req, res) => {
    try {
        const result = await db.query('SELECT * FROM amazon_links');
        res.json(result.rows);
    } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
      }  });

app.get('/reviews', async(req, res) => {
    try {
        const result = await db.query('SELECT * FROM reviews');
        res.json(result.rows);
    } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
      }  });



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
