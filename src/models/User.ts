import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  likes: string[];
  cart: { productId: string; quantity: number }[];
  purchases: string[];
  moreInfo: {
    name: string;
    lastName: string;
    address: string;
    showName: string;
  };
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likes: { type: [String], default: [] },
  cart: { type: [{ productId: String, quantity: Number }], default: [] },
  purchases: { type: [String], default: [] },
  moreInfo: {
    name: { type: String, default: "" },
    lastName: { type: String, default: "" },
    address: { type: String, default: "" },
    showName: { type: String, default: "" },
  },
});

export default mongoose.model<IUser>("User", UserSchema);
