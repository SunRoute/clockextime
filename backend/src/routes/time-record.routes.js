import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  clockIn,
  clockOut,
  getMyTimeRecords,
} from "../controllers/time-record.controller.js";

const router = express.Router();

router.post("/clock-in", verifyToken, clockIn);
router.post("/clock-out", verifyToken, clockOut);
router.get("/mine", verifyToken, getMyTimeRecords);

export default router;
