"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importBooks = exports.deleteBookById = exports.getBooksList = exports.getBookById = exports.updateBook = exports.addBooks = exports.getAllBooks = void 0;
const express_validator_1 = require("express-validator");
const book_service_1 = require("../services/book.service");
const appResponseStatus_1 = require("../utils/appResponseStatus");
const appResponseMessage_1 = require("../utils/appResponseMessage");
const booksService = new book_service_1.BooksService();
const getAllBooks = (req, res) => {
    res.json([
        {
            id: '1',
            title: 'The Alchemist',
            author: 'Paulo Coelho',
            publishedYear: 1988
        }
    ]);
};
exports.getAllBooks = getAllBooks;
const addBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const args = yield booksService.addBooks(req.body);
        res.status(args.status).json(args);
    }
    catch (error) {
        console.log(error, "error");
        res.status(appResponseStatus_1.appResponseStatus.BadRequest).json({
            success: false,
            status: appResponseStatus_1.appResponseStatus.BadRequest,
            message: appResponseMessage_1.appResponseMessage.EXCEPTION,
        });
    }
});
exports.addBooks = addBooks;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const args = yield booksService.updateBook(req.params.id, req.body);
        res.status(args.status).json(args);
    }
    catch (error) {
        console.log(error, "error");
        res.status(appResponseStatus_1.appResponseStatus.BadRequest).json({
            success: false,
            status: appResponseStatus_1.appResponseStatus.BadRequest,
            message: appResponseMessage_1.appResponseMessage.EXCEPTION,
        });
    }
});
exports.updateBook = updateBook;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const args = yield booksService.getBookById(req.params.id);
        res.status(args.status).json(args);
    }
    catch (error) {
        console.log(error, "error");
        res.status(appResponseStatus_1.appResponseStatus.BadRequest).json({
            success: false,
            status: appResponseStatus_1.appResponseStatus.BadRequest,
            message: appResponseMessage_1.appResponseMessage.EXCEPTION,
        });
    }
});
exports.getBookById = getBookById;
const getBooksList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const args = yield booksService.getBooksList();
        res.status(args.status).json(args);
    }
    catch (error) {
        console.log(error, "error");
        res.status(appResponseStatus_1.appResponseStatus.BadRequest).json({
            success: false,
            status: appResponseStatus_1.appResponseStatus.BadRequest,
            message: appResponseMessage_1.appResponseMessage.EXCEPTION,
        });
    }
});
exports.getBooksList = getBooksList;
const deleteBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const args = yield booksService.deleteBookById(req.params.id);
        res.status(args.status).json(args);
    }
    catch (error) {
        console.log(error, "error");
        res.status(appResponseStatus_1.appResponseStatus.BadRequest).json({
            success: false,
            status: appResponseStatus_1.appResponseStatus.BadRequest,
            message: appResponseMessage_1.appResponseMessage.EXCEPTION,
        });
    }
});
exports.deleteBookById = deleteBookById;
const importBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const args = yield booksService.importBooks(req.file);
        res.status(args.status).json(args);
    }
    catch (error) {
        console.log(error, "error");
        res.status(appResponseStatus_1.appResponseStatus.BadRequest).json({
            success: false,
            status: appResponseStatus_1.appResponseStatus.BadRequest,
            message: appResponseMessage_1.appResponseMessage.EXCEPTION,
        });
    }
});
exports.importBooks = importBooks;
