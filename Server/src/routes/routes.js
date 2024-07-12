import express from 'express'
import {createBook, getBook, getBooks, deleteBook, getSortedBooksController} from '../controllers/controllers.js'

const router =  express.Router()

router.post('/', createBook)
router.get('/',getBooks)
router.get('/:id', getBook)
router.delete('/:id', deleteBook);
router.get('/sort', getSortedBooksController)


export default router