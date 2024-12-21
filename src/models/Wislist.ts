import mongoose, { Schema, Document } from "mongoose";

interface IWishlist extends Document {
  userId: string;
  products: string[];
}

const WishlistSchema = new Schema<IWishlist>({
  userId: { type: String, required: true },
  products: { type: [String], default: [] },
});

export default mongoose.model<IWishlist>("Wishlist", WishlistSchema);
