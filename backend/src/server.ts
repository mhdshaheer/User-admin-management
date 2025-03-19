import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import app from "./app";
import connectDB from "./config/db";

dotenv.config({ path: path.resolve(__dirname, "../.env") });
const PORT = process.env.PORT || 5003;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
