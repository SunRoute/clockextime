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

    // Verificar si la contraseña ha sido cambiada
    if (!user.password_changed) {
      return res.status(403).json({
        message: "Debe cambiar la contraseña antes de continuar",
        requirePasswordChange: true,
      });
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

// Cambiar contraseña la primera vez que se accede
export const firstChangePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? AND active = TRUE",
      [email],
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];

    // Solo permitir si aún no ha cambiado contraseña
    if (user.password_changed) {
      return res.status(400).json({
        message: "La contraseña ya fue cambiada",
      });
    }

    const validPassword = await bcrypt.compare(currentPassword, user.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "Contraseña actual incorrecta",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `
      UPDATE users 
      SET password = ?, password_changed = TRUE 
      WHERE id = ?
      `,
      [hashedPassword, user.id],
    );

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al cambiar contraseña" });
  }
};
