import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//signup controller
//input:{email,password}
//success output:{message,user,token}
//error output:{message,error}
export default async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  console.log("signin in progress...");

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    console.log("existingUser", existingUser);
    if (!existingUser) {
      console.log("User not found");
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect: boolean = await bcrypt.compare(
      password,
      existingUser.password
    );
    console.log("isPasswordCorrect", isPasswordCorrect);
    if (!isPasswordCorrect) {
      console.log("Invalid password");
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );
    console.log("token", token);
    console.log("signin success", existingUser);
    return res.status(200).json({
      message: "User logged in successfully",
      user: existingUser,
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};
