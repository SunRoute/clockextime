import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/test", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS result");
    res.json({
      status: "ok",
      db: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
