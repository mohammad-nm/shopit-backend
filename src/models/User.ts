import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  likes: string[];
  cart: string[];
  purchases: string[];
  info: {
    name: string;
    lastName: string;
    address: string;
    showName: string;
    email: string;
    password: string;
  };
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  likes: [{ type: String }],
  cart: [{ type: String }],
  purchases: [{ type: String }],
  info: {
    name: { type: String, required: true },
    lastName: { type: String },
    address: { type: String },
    showName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
