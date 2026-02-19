import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { login, profile } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.get("/profile", verifyToken, profile);

export default router;
