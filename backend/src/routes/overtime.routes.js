import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { verifyAdmin } from "../middlewares/role.middleware.js";
import {
  getPendingOvertimes,
  updateOvertimeStatus,
  getMyOvertimes,
  addOvertimeReason,
} from "../controllers/overtime.controller.js";

const router = express.Router();

// Empleado
router.get("/mine", verifyToken, getMyOvertimes);
router.put("/:id/reason", verifyToken, addOvertimeReason);

// Admin
router.get("/pending", verifyToken, verifyAdmin, getPendingOvertimes);
router.put("/:id", verifyToken, verifyAdmin, updateOvertimeStatus);

export default router;
