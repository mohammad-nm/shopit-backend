import mongoose, { Schema, Document } from "mongoose";

interface ICart extends Document {
  userId: string;
  products: string[];
}

const CartSchema = new Schema<ICart>({
  userId: { type: String, required: true },
  products: { type: [{ productId: String, quantity: Number }], default: [] },
});

export default mongoose.model<ICart>("Cart", CartSchema);
