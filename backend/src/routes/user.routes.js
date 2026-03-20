import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/role.middleware.js";
import {
  getAllUsers,
  createUser,
  toggleUserActive,
  changePassword,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.post("/", verifyToken, verifyAdmin, createUser);
router.put("/:id/toggle", verifyToken, verifyAdmin, toggleUserActive);
router.put("/change-password", verifyToken, changePassword);

export default router;
