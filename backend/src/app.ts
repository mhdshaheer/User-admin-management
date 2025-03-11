import express from "express";
import userRouter from "./routes/userRoutes";
import cors from "cors";
// import adminRoutes from "./routes/adminRoutes";

const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Middleware
app.use(express.json());
console.log("I am on routes");
// Routes
app.use("/", userRouter);
// app.use("/api/admin", adminRoutes);

export default app; // Exporting for use in server.ts
