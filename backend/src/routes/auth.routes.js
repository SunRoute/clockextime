import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  login,
  firstChangePassword,
  profile,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.put("/first-change-password", firstChangePassword);
router.get("/profile", verifyToken, profile);

export default router;
