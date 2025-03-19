import express from "express";
import { currentUserData, registerUser } from "../controllers/userController";
import { verifyJwtToken } from "../middlewares/jwtVerify";

const router = express.Router();

router.post("/register", registerUser);
router.get("/current-user", verifyJwtToken, currentUserData);

export default router;
