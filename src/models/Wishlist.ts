import mongoose, { Schema, Document } from "mongoose";

export interface IWishlist extends Document {
  userId: string;
  products: {
    productId: string;
  }[];
}

const WishlistSchema = new Schema<IWishlist>({
  userId: { type: String, required: true },
  products: { type: [{ productId: String }], default: [] },
});

export default mongoose.model<IWishlist>("Wishlist", WishlistSchema);
