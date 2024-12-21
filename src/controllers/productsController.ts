import { Request, Response } from "express";
import Product from "../models/Product";

// Get all products
//input: page, category, search, limit
//output: products:Product[], totalProducts:number, totalPages:number, currentPage:number
export default async function getProducts(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { page, category, search, limit } = req.body;

  const searchString = search || "";
  const categoryString = category || "";
  const pageNumber: number = Number(page as string) || 1;
  const limitNumber: number = Number(limit as string) || 10;

  try {
    const query: any = {};
    if (searchString && searchString.trim() !== "") {
      query.$or = [
        { title: { $regex: searchString, $options: "i" } },
        { description: { $regex: searchString, $options: "i" } },
      ];
    }
    if (categoryString && categoryString.trim() !== "") {
      query.categories = { $in: [categoryString] };
    }
    const products = await Product.find(query)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalProducts = await Product.countDocuments(query);

    return res.status(200).json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limitNumber),
      currentPage: pageNumber,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
}

// Get product by id
//input: productId
//output: product:Product
export async function getProductById(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { productId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
}

// Get products by ids
//input: productIds:string[]
//output: products:Product[]
export async function getProductsByIds(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const productIds = req.body.ids;
  console.log(productIds);

  try {
    const products = await Product.find({ _id: { $in: productIds } });
    return res.status(200).json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
}
