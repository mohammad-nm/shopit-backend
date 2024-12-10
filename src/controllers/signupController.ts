import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//signup controller
//input:{email,password}
//success output:{message,user,token}
//error output:{message,error}
export default async (req: Request, res: Response) => {
  console.log("signup in progress...");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(409)
        .json({ message: "Email and password are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    console.log("signup success", newUser);
    res
      .status(200)
      .json({ message: "User created successfully", user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};
