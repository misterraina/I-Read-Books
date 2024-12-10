import express from 'express'
import {createBook, getBook, getBooks, deleteBook, getSortedBooksController, putBook} from '../controllers/controllers.js'

const router =  express.Router()

router.post('/', createBook)
router.get('/',getBooks)
router.get('/bookId/:id', getBook)
router.get('/sort', getSortedBooksController)
router.put('/bookNo/:id', putBook);
router.delete('/:id', deleteBook);


export default router