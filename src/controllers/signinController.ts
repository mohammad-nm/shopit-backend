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
  let { email, password, token } = req.body;
  try {
    //if token is provided, decode it and get email and password for session authentication
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        email: string;
        password: string;
      };

      if (!decoded.email || !decoded.password) {
        return res.status(400).json({ message: "Invalid token" });
      }
      email = decoded.email;
      password = decoded.password;
    }

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect: boolean =
      (await bcrypt.compare(password, existingUser.password)) ||
      password === existingUser.password;
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const resToken: string = jwt.sign(
      { password: existingUser.password, email: existingUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    return res.status(200).json({ user: existingUser, token: resToken });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};
