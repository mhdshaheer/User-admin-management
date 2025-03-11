import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    // console.log('Hai mongodb: ',process.env.MONGODB_URL)
    await mongoose.connect('mongodb://127.0.0.1:27017/manage-user');
    // await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};

export default connectDB;
