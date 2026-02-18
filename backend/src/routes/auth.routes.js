import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { login, perfil } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.get("/perfil", verifyToken, perfil);

export default router;
