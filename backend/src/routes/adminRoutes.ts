import express from "express";
import {
  addUser,
  adminLogin,
  deleteUser,
  editUser,
  getUsers,
} from "../controllers/adminController";
const router = express.Router();
router.post("/login", adminLogin);
router.get("/users", getUsers);
router.post("/addUser", addUser);
router.put("/deleteUser/:userId", deleteUser);
router.put("/unblockUser/:userId", deleteUser);
router.put("/editUser/:userId", editUser);
export default router;
