import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  id: string;
  title: string;
  available: number;
  description: string;
  pictureUrls: string[];
  categories: string[];
  tags: string[];
  info: { infoTitle: string; info: string }[];
  options: string[];
  comments: { comment: string; commentedBy: string; date: string }[];
  scores: number[];
}

const productSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  available: { type: Number, required: true },
  description: { type: String },
  pictureUrls: [{ type: String }],
  categories: [{ type: String }],
  tags: [{ type: String }],
  info: [{ infoTitle: String, info: String }],
  options: [{ type: String }],
  comments: [
    {
      comment: String,
      commentedBy: String,
      date: String,
    },
  ],
  scores: [{ type: Number }],
});

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
