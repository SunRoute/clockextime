import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/role.middleware.js";
import {
  getAllUsers,
  createUser,
  updateUser,
  toggleUserActive,
  resetPassword,
  changePassword,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.post("/", verifyToken, verifyAdmin, createUser);
router.put("/:id", verifyToken, verifyAdmin, updateUser);
router.put("/:id/toggle", verifyToken, verifyAdmin, toggleUserActive);
router.put("/:id/reset-password", verifyToken, verifyAdmin, resetPassword);
router.put("/change-password", verifyToken, changePassword);

export default router;
