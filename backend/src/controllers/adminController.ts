import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
export const adminLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { user: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token, user });
  } catch (error) {}
};
export const getUsers = async (req: any, res: Response) => {
  try {
    const users = await User.find({ isAdmin: false }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export const addUser = async (req: any, res: Response) => {
  try {
    const user = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.insertOne({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    });
    let savedUser = await User.findOne({ email: user.email });
    res.status(200).json({ savedUser });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
export const deleteUser = async (req: any, res: Response) => {
  try {
    const { userId } = req.params;
    await User.updateOne({ _id: userId }, { $set: { isBlocked: true } });
    res.status(200).json({ userId });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const unblockUser = async (req: any, res: Response) => {
  try {
    const { userId } = req.params;
    await User.updateOne({ _id: userId }, { $set: { isBlocked: false } });
    res.status(200).json({ userId });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const editUser = async (req: any, res: Response) => {
  try {
    console.log(req.body);
    const user = req.body;
    await User.updateOne(
      { _id: user._id },
      { $set: { name: user.name, email: user.email } }
    );
    const updatedUser = await User.findOne({ _id: user._id });
    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
