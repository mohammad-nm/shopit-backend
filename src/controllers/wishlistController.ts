import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Wishlist from "../models/Wishlist";
import { IWishlist } from "../models/Wishlist";
import { getProductsByIds } from "./productsController";
import Product from "../models/Product";
export const addToWishlist = async (req: Request, res: Response) => {
  const { jwt: jwtToken, productId: Id } = req.body;
  const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET as string);
  const userId = (decoded as { userId: string }).userId;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const wishlist: IWishlist | null = await Wishlist.findOne({ userId });
  if (!wishlist) {
    await Wishlist.create({ userId, products: [{ productId: Id }] });
  } else {
    wishlist.products.push({ productId: Id });
    await wishlist.save();
  }
  res.status(200).json({ message: "Product added to wishlist", wishlist });
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  const { jwt: jwtToken, productId } = req.body;
  const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET as string);
  const userId = (decoded as { userId: string }).userId;

  const wishlist: IWishlist | null = await Wishlist.findOne({ userId });
  if (!wishlist) {
    return res.status(404).json({ message: "Wishlist not found" });
  }
  wishlist.products = wishlist.products.filter((id) => id !== productId);
  await wishlist.save();
  res.status(200).json({ message: "Product removed from wishlist", wishlist });
};

export const getWishlist = async (req: Request, res: Response) => {
  console.log("getWishlist");
  const { jwt: jwtToken } = req.body;
  const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET as string);
  const userId = (decoded as { userId: string }).userId;
  const wishlist: IWishlist | null = await Wishlist.findOne({ userId });
  console.log("wush:", wishlist);
  if (!wishlist) {
    return res.status(404).json({ message: "Wishlist not found" });
  }
  const productIds = wishlist.products.map(
    (item: { productId: string }) => item.productId
  );
  console.log(productIds);
  try {
    const products = await Product.find({ _id: { $in: productIds } });
    return res.status(200).json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }

  // res.status(200).json({ wishlist });
};

export const clearWishlist = async (req: Request, res: Response) => {
  const { jwt: jwtToken } = req.body;
  const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET as string);
  const userId = (decoded as { userId: string }).userId;
  const wishlist: IWishlist | null = await Wishlist.findOne({ userId });
  if (!wishlist) {
    return res.status(404).json({ message: "Wishlist not found" });
  }
  wishlist.products = [];
  await wishlist.save();
  res.status(200).json({ message: "Wishlist cleared", wishlist });
};

export const UpdateWishlistAfterLogin = async (req: Request, res: Response) => {
  const { jwt: jwtToken, productId } = req.body;
  const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET as string);
  const userId = (decoded as { userId: string }).userId;
  const wishlist: IWishlist | null = await Wishlist.findOne({ userId });
  if (!wishlist) {
    return res.status(404).json({ message: "Wishlist not found" });
  }
  wishlist.products.push(productId);
  await wishlist.save();
  res.status(200).json({ message: "Product added to wishlist", wishlist });
};
