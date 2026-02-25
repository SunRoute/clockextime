import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { verifyAdmin } from "../middlewares/role.middleware.js";
import {
  getAllUsers,
  createUser,
  deactivateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.post("/", verifyToken, verifyAdmin, createUser);
router.put("/:id/deactivate", verifyToken, verifyAdmin, deactivateUser);

export default router;
