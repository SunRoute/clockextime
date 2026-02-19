import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { clockIn, clockOut } from "../controllers/time-records.controller.js";

const router = express.Router();

router.post("/clock-in", verifyToken, clockIn);
router.post("/clock-out", verifyToken, clockOut);

export default router;
