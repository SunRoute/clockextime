import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { verifyAdmin } from "../middlewares/role.middleware.js";
import {
  getPendingOvertimes,
  updateOvertimeStatus,
  addOvertimeReason,
} from "../controllers/overtime.controller.js";

const router = express.Router();

// Admin
router.get("/pending", verifyToken, verifyAdmin, getPendingOvertimes);
router.put("/:id", verifyToken, verifyAdmin, updateOvertimeStatus);

// Empleado añade motivo
router.put("/:id/reason", verifyToken, addOvertimeReason);

export default router;
