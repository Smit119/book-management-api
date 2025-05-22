import { check } from 'express-validator';



export const validate = (method: string) => {
    switch (method) {
        case 'addBook': {
            return [
                check('title').not().isEmpty().withMessage('The Book title field is required.'),
                check('author').not().isEmpty().withMessage('The Book author field os required.'),
                check('publishedYear').not().isEmpty().withMessage('The Book publishedYear field is required.'),
            ];
        }
        case 'updateBook': {
            return [
                check('title').optional(),
                check('author').optional(),
                check('publishedYear').optional(),
            ];
        }
        default:
            return [];
    }
};