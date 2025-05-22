import { Router } from 'express';
import { addBooks, deleteBookById, getBookById, getBooksList, importBooks, updateBook } from '../controllers/book.controller';
import { validate } from '../requests/book.requests';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

router.post('/books', validate('addBook'), addBooks);
router.put('/updateBooks/:id', validate('updateBook'), updateBook)
router.get('/singleBook/:id', getBookById)
router.get('/getBooksList', getBooksList)
router.delete('/deleteBook/id', deleteBookById)

router.post('/books/import', upload.single('file'), importBooks);

export default router;
