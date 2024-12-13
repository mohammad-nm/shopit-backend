import { Request, Response } from "express";
import Product from "../models/Product";
import User from "../models/User";

export default async function cartUpdate(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  if (
    !req.body.userId ||
    !req.body.productId ||
    typeof req.body.quantity !== "number"
  ) {
    return res.status(400).json({ message: "Invalid request" });
  }
  const { userId, productId, quantity } = req.body;
  //checking if the user exists
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  //checking if the product exists
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let cart: { productId: string; quantity: number }[] = user.cart;
  //removing or adding or updating the product quantity
  if (quantity === 0) {
    //removing the product from the cart if quantity is 0
    cart = cart.filter((item) => item.productId !== productId);
  } else if (quantity > 0) {
    //updating the product quantity if quantity is greater than 0
    //checking if the product already exists in the cart
    const existingProduct = cart.find((item) => item.productId === productId);
    if (existingProduct) {
      //updating the product quantity
      existingProduct.quantity = quantity;
      //removing the product from the cart
      cart = cart.filter((item) => item.productId !== productId);
      //adding the product to the cart
      cart.push(existingProduct);
    } else {
      //adding new product to the cart
      cart.push({ productId: productId, quantity: quantity });
    }
  }
  //updating the cart in the database
  user.cart = cart;

  await user.save();
  //returning the updated cart
  return res.status(200).json({ message: "Cart updated", cart: user.cart });
}
