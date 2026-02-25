import pool from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const profile = (req, res) => {
  res.json({
    message: "Acceso autorizado",
    user: req.user,
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const [rows] = await pool.query(
      "SELECT users.*, roles.role_name FROM users JOIN roles ON users.role_id = roles.id WHERE email = ? AND active = TRUE",
      [email],
    );
    if (rows.length === 0) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }
    const user = rows[0];

    // Comparar contraseña hasheada
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }
    // Crear token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );
    res.json({
      message: "Login correcto",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en login" });
  }
};
