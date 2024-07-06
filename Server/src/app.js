import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bookRoutes from './routes/routes.js'

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(express.json())

app.use('/api/books', bookRoutes);       

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

export {app}
