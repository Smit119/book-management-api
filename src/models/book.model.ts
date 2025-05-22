import mongoose, { model, Schema } from "mongoose";


const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: String, required: true },
});

export const Book = model('Book', bookSchema);
