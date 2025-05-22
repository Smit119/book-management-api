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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const appResponseMessage_1 = require("../utils/appResponseMessage");
const appResponseStatus_1 = require("../utils/appResponseStatus");
const book_model_1 = require("../models/book.model");
class BooksService {
    addBooks(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let BookData = yield book_model_1.Book.create(payload);
                return {
                    success: true,
                    status: appResponseStatus_1.appResponseStatus.OK,
                    message: appResponseMessage_1.appResponseMessage.RECORD_CREATED_SUCCESS,
                    data: BookData
                };
            }
            catch (error) {
                console.log("addBooks Error", error);
                throw error;
            }
        });
    }
    updateBook(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let checkExists = yield book_model_1.Book.findById(id);
                if (!checkExists) {
                    return {
                        success: false,
                        status: appResponseStatus_1.appResponseStatus.BadRequest,
                        message: appResponseMessage_1.appResponseMessage.ID_NOT_FOUND,
                    };
                }
                const updateResult = yield book_model_1.Book.updateOne({ _id: id }, payload);
                return {
                    success: true,
                    status: appResponseStatus_1.appResponseStatus.OK,
                    message: appResponseMessage_1.appResponseMessage.RECORD_UPDATED_SUCCESS,
                };
            }
            catch (error) {
                console.log("updateBook Error", error);
                throw error;
            }
        });
    }
    getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let checkExists = yield book_model_1.Book.findById(id);
                if (!checkExists) {
                    return {
                        success: false,
                        status: appResponseStatus_1.appResponseStatus.BadRequest,
                        message: appResponseMessage_1.appResponseMessage.ID_NOT_FOUND,
                    };
                }
                const book = yield book_model_1.Book.findById(id);
                return {
                    success: true,
                    status: appResponseStatus_1.appResponseStatus.OK,
                    message: appResponseMessage_1.appResponseMessage.SUCCESS,
                    data: book
                };
            }
            catch (error) {
                console.log("getBookById Error", error);
                throw error;
            }
        });
    }
    getBooksList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookList = yield book_model_1.Book.find({});
                return {
                    success: true,
                    status: appResponseStatus_1.appResponseStatus.OK,
                    message: appResponseMessage_1.appResponseMessage.SUCCESS,
                    data: bookList
                };
            }
            catch (error) {
                console.log("getBooksList Error", error);
                throw error;
            }
        });
    }
    deleteBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let checkExists = yield book_model_1.Book.findById(id);
                if (!checkExists) {
                    return {
                        success: false,
                        status: appResponseStatus_1.appResponseStatus.BadRequest,
                        message: appResponseMessage_1.appResponseMessage.ID_NOT_FOUND,
                    };
                }
                const removeBook = yield book_model_1.Book.deleteOne({ _id: id });
                return {
                    success: true,
                    status: appResponseStatus_1.appResponseStatus.OK,
                    message: appResponseMessage_1.appResponseMessage.RECORD_DELETED_SUCCESS,
                };
            }
            catch (error) {
                console.log("deleteBookById Error", error);
                throw error;
            }
        });
    }
    importBooks(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uploadsDir = path_1.default.join(__dirname, '../../uploads');
                if (!fs_1.default.existsSync(uploadsDir)) {
                    fs_1.default.mkdirSync(uploadsDir);
                }
                const fileName = `${Date.now()}-${file.name}`;
                const filePath = path_1.default.join(uploadsDir, fileName);
                fs_1.default.writeFileSync(filePath, file.buffer);
                const fileContent = fs_1.default.readFileSync(filePath, 'utf8');
                const lines = fileContent.split(/\r?\n/).filter(line => line.trim().length > 0);
                if (lines.length < 2) {
                    return {
                        success: false,
                        status: 400,
                        message: 'CSV must contain at least one data row.',
                        addedCount: 0,
                        errors: [{ row: 0, error: 'CSV is empty or only has headers.' }],
                    };
                }
                const headers = lines[0].split(',').map(h => h.trim());
                const requiredFields = ['title', 'author', 'publishedYear'];
                const missingHeaders = requiredFields.filter(field => !headers.includes(field));
                if (missingHeaders.length > 0) {
                    return {
                        success: false,
                        status: 400,
                        message: `Missing headers: ${missingHeaders.join(', ')}`,
                        addedCount: 0,
                        errors: [],
                    };
                }
                const booksToInsert = [];
                const errorRows = [];
                // Step 4: Loop through data rows
                for (let i = 1; i < lines.length; i++) {
                    const values = lines[i].split(',').map(v => v.trim());
                    if (values.length !== headers.length) {
                        errorRows.push({ row: i + 1, error: 'Column count mismatch' });
                        continue;
                    }
                    const book = {};
                    headers.forEach((header, idx) => {
                        book[header] = values[idx];
                    });
                    // Manual validation
                    const rowErrors = [];
                    if (!book.title)
                        rowErrors.push('Missing title');
                    if (!book.author)
                        rowErrors.push('Missing author');
                    if (!book.publishedYear)
                        rowErrors.push('Missing publishedYear');
                    if (rowErrors.length > 0) {
                        errorRows.push({ row: i + 1, error: rowErrors.join(', ') });
                    }
                    else {
                        booksToInsert.push({
                            title: book.title,
                            author: book.author,
                            publishedYear: book.publishedYear,
                        });
                    }
                }
                // Step 5: Insert valid books into MongoDB
                if (booksToInsert.length > 0) {
                    try {
                        yield book_model_1.Book.insertMany(booksToInsert);
                    }
                    catch (insertError) {
                        console.error('Insert Error:', insertError);
                        throw {
                            success: false,
                            status: 500,
                            message: 'Failed to insert books into the database.',
                            error: insertError,
                        };
                    }
                }
                return {
                    success: true,
                    status: 200,
                    message: 'Books processed',
                    addedCount: booksToInsert.length,
                    errors: errorRows,
                };
            }
            catch (error) {
                console.log("importBooks Error", error);
                throw error;
            }
        });
    }
}
exports.BooksService = BooksService;
