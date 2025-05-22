"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (method) => {
    switch (method) {
        case 'addBook': {
            return [
                (0, express_validator_1.check)('title').not().isEmpty().withMessage('The Book title field is required.'),
                (0, express_validator_1.check)('author').not().isEmpty().withMessage('The Book author field os required.'),
                (0, express_validator_1.check)('publishedYear').not().isEmpty().withMessage('The Book publishedYear field is required.'),
            ];
        }
        case 'updateBook': {
            return [
                (0, express_validator_1.check)('title').optional(),
                (0, express_validator_1.check)('author').optional(),
                (0, express_validator_1.check)('publishedYear').optional(),
            ];
        }
        default:
            return [];
    }
};
exports.validate = validate;
