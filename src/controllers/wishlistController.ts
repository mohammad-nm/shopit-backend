import { Request, Response } from "express";

export const addToWishlist = async (req: Request, res: Response) => {
  const { jwt, productId } = req.body;
  //   const decoded = jwt.verify(jwt, process.env.JWT_SECRET as string);
  console.log(jwt);
  res.status(200).json({ jwt });
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  const { productId } = req.body;
};

export const getWishlist = async (req: Request, res: Response) => {};

export const clearWishlist = async (req: Request, res: Response) => {};
