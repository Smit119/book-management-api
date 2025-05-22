import { validationResult } from "express-validator";
import { BooksService } from "../services/book.service";
import { appResponseStatus } from "../utils/appResponseStatus";
import { appResponseMessage } from "../utils/appResponseMessage";
const booksService = new BooksService();
export const getAllBooks = (req: any, res: any) => {
  res.json([
    {
      id: '1',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      publishedYear: 1988
    }
  ]);
};

export const addBooks = async (req: any, res: any) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const args = await booksService.addBooks(req.body);
        res.status(args.status).json(args);
    } catch (error) {
        console.log(error, "error");
        res.status(appResponseStatus.BadRequest).json({
            success: false,
            status: appResponseStatus.BadRequest,
            message: appResponseMessage.EXCEPTION,
        });
    }
}

export const updateBook = async (req: any, res: any) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const args = await booksService.updateBook(req.params.id, req.body);
        res.status(args.status).json(args);
    } catch (error) {
        console.log(error, "error");
        res.status(appResponseStatus.BadRequest).json({
            success: false,
            status: appResponseStatus.BadRequest,
            message: appResponseMessage.EXCEPTION,
        });
    }
}


export const getBookById = async (req: any, res: any) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const args = await booksService.getBookById(req.params.id);
        res.status(args.status).json(args);
    } catch (error) {
        console.log(error, "error");
        res.status(appResponseStatus.BadRequest).json({
            success: false,
            status: appResponseStatus.BadRequest,
            message: appResponseMessage.EXCEPTION,
        });
    }
}

export const getBooksList = async (req: any, res: any) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const args = await booksService.getBooksList();
        res.status(args.status).json(args);
    } catch (error) {
        console.log(error, "error");
        res.status(appResponseStatus.BadRequest).json({
            success: false,
            status: appResponseStatus.BadRequest,
            message: appResponseMessage.EXCEPTION,
        });
    }
}



export const deleteBookById = async (req: any, res: any) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const args = await booksService.deleteBookById(req.params.id);
        res.status(args.status).json(args);
    } catch (error) {
        console.log(error, "error");
        res.status(appResponseStatus.BadRequest).json({
            success: false,
            status: appResponseStatus.BadRequest,
            message: appResponseMessage.EXCEPTION,
        });
    }
}

export const importBooks = async (req: any, res: any) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const args = await booksService.importBooks(req.file);
        res.status(args.status).json(args);
    } catch (error) {
        console.log(error, "error");
        res.status(appResponseStatus.BadRequest).json({
            success: false,
            status: appResponseStatus.BadRequest,
            message: appResponseMessage.EXCEPTION,
        });
    }
}



