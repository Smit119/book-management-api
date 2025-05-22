import fs from 'fs';
import path from 'path';
import { appResponseMessage } from "../utils/appResponseMessage";
import { appResponseStatus } from "../utils/appResponseStatus";
import { Book } from "../models/book.model"

export class BooksService {
    async addBooks(payload: any) {
        try {
            let BookData = await Book.create(payload)
            return {
                success: true,
                status: appResponseStatus.OK,
                message: appResponseMessage.RECORD_CREATED_SUCCESS,
                data: BookData
            };
        } catch (error) {
            console.log("addBooks Error", error);
            throw error;
        }
    }

    async updateBook(id: string, payload: any) {
        try {
            let checkExists = await Book.findById(id)
            if (!checkExists) {
                return {
                    success: false,
                    status: appResponseStatus.BadRequest,
                    message: appResponseMessage.ID_NOT_FOUND,
                };
            }
            const updateResult = await Book.updateOne({ _id: id }, payload)
            return {
                success: true,
                status: appResponseStatus.OK,
                message: appResponseMessage.RECORD_UPDATED_SUCCESS,
            };
        } catch (error) {
            console.log("updateBook Error", error);
            throw error;
        }
    }

    async getBookById(id: string) {
        try {
            let checkExists = await Book.findById(id)
            if (!checkExists) {
                return {
                    success: false,
                    status: appResponseStatus.BadRequest,
                    message: appResponseMessage.ID_NOT_FOUND,
                };
            }
            const book = await Book.findById(id);
            return {
                success: true,
                status: appResponseStatus.OK,
                message: appResponseMessage.SUCCESS,
                data: book
            };
        } catch (error) {
            console.log("getBookById Error", error);
            throw error;
        }
    }

    async getBooksList() {
        try {
            const bookList = await Book.find({})
            return {
                success: true,
                status: appResponseStatus.OK,
                message: appResponseMessage.SUCCESS,
                data: bookList
            };
        } catch (error) {
            console.log("getBooksList Error", error);
            throw error;
        }
    }
    async deleteBookById(id: string) {
        try {

            let checkExists = await Book.findById(id)
            if (!checkExists) {
                return {
                    success: false,
                    status: appResponseStatus.BadRequest,
                    message: appResponseMessage.ID_NOT_FOUND,
                };
            }

            const removeBook = await Book.deleteOne({ _id: id });
            return {
                success: true,
                status: appResponseStatus.OK,
                message: appResponseMessage.RECORD_DELETED_SUCCESS,
            };
        } catch (error) {
            console.log("deleteBookById Error", error);
            throw error;
        }
    }

    async importBooks(file: any) {
        try {
            const uploadsDir = path.join(__dirname, '../../uploads');
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir);
            }
            const fileName = `${Date.now()}-${file.name}`;
            const filePath = path.join(uploadsDir, fileName);
            fs.writeFileSync(filePath, file.buffer);

            const fileContent = fs.readFileSync(filePath, 'utf8');
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

            const booksToInsert: any[] = [];
            const errorRows: any[] = [];

            // Step 4: Loop through data rows
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',').map(v => v.trim());
                if (values.length !== headers.length) {
                    errorRows.push({ row: i + 1, error: 'Column count mismatch' });
                    continue;
                }

                const book: any = {};
                headers.forEach((header, idx) => {
                    book[header] = values[idx];
                });

                // Manual validation
                const rowErrors: string[] = [];

                if (!book.title) rowErrors.push('Missing title');
                if (!book.author) rowErrors.push('Missing author');
                if (!book.publishedYear) rowErrors.push('Missing publishedYear');

                if (rowErrors.length > 0) {
                    errorRows.push({ row: i + 1, error: rowErrors.join(', ') });
                } else {
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
                    await Book.insertMany(booksToInsert);
                } catch (insertError) {
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
        } catch (error) {
            console.log("importBooks Error", error);
            throw error;
        }
    }
}