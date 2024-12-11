import { Request, Response } from "express";
import Product from "../models/Product";
import jwt from "jsonwebtoken";
import { title } from "process";

// Get all products
//input: page, category, search, limit, token
//output: products:Product[], totalProducts:number, totalPages:number, currentPage:number
export default async function getProducts(req: Request, res: Response) {
  console.log("getProducts called");
  console.log("req.method", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { page, category, search, limit } = req.body;
  console.log("req.body", req.body);
  const searchString = req.body.search || "";
  const categoryString = req.body.category || "";
  const pageNumber: number = Number(req.body.page as string) || 1;
  const limitNumber: number = Number(req.body.limit as string) || 10;
  console.log("pageNumber", pageNumber, "limitNumber", limitNumber);
  console.log("searchString", searchString);
  console.log("categoryString", categoryString);
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
    console.log("query", query);
    // console.log("MongoDB Query", JSON.stringify(query, null, 2));
    const products = await Product.find(query)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);
    console.log("products", products);
    const totalProducts = await Product.countDocuments(query);
    console.log("totalProducts", totalProducts);
    console.log(products.length);
    return res.status(200).json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limitNumber),
      currentPage: pageNumber,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
    console.log("error", error);
  }
}

// Get product by id
//input:
//output:
// export async function getProductById(req: Request, res: Response) {
//   const product = await Product.findById(req.params.id);
//   res.json(product);
// }
