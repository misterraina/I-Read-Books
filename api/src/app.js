import express from 'express';
import bookRoutes from './routes/bookRoutes.js'
import cors from 'cors'
import authRoute from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());

const corsOptions = {
    origin: "https://i-read-books-k61i.vercel.app", // Replace with your frontend's origin
    credentials: true, // Allow credentials (cookies)
    allowedHeaders: ['Authorization', 'Content-Type'],
};

app.use(cors(corsOptions))

app.use(express.json());
app.use('/books', bookRoutes);
app.use('/auth', authRoute)

export default app;
