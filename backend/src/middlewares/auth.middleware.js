import jwt from "jsonwebtoken";
import pool from "../config/db.js";

// Verificar si el token existe y es válido. Será en formato Bearer <token>
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Comprobar que el usuario sigue activo en base de datos
    const [rows] = await pool.query("SELECT active FROM users WHERE id = ?", [
      decoded.id,
    ]);

    if (rows.length === 0 || !rows[0].active) {
      return res
        .status(403)
        .json({ message: "Usuario inactivo o inexistente" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }
};
