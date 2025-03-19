import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};

export default connectDB;
