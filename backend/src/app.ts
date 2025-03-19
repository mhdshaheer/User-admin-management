import express from "express";
import userRouter from "./routes/userRoutes";
import adminRouter from "./routes/adminRoutes";
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
// Routes
app.use("/", userRouter);
app.use("/admin", adminRouter);

export default app;
