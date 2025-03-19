import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: fullName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};
const currentUserData = async (req: any, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.user).select("name email");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
    return;
  } catch (error) {
    res.status(500).json({ message: "server error" });
    return;
  }
};
export { registerUser, currentUserData };
