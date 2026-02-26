import pool from "../config/db.js";
import bcrypt from "bcrypt";

// Obtener todos los usuarios (solo para admin)
export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT 
        id,
        employee_number,
        employee_name,
        email,
        role_id,
        active,
        created_at
      FROM users
      ORDER BY created_at DESC
      `,
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuarios." });
  }
};

// Crear nuevo usuario (solo para admin)
export const createUser = async (req, res) => {
  try {
    const { employee_number, employee_name, email, password, role_id } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `
      INSERT INTO users 
      (employee_number, employee_name, email, password, role_id)
      VALUES (?, ?, ?, ?, ?)
      `,
      [employee_number, employee_name, email, hashedPassword, role_id],
    );

    res.status(201).json({ message: "Usuario creado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear usuario." });
  }
};

// Desactivar usuario (solo para admin)
export const deactivateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await pool.query("UPDATE users SET active = FALSE WHERE id = ?", [userId]);

    res.json({ message: "Usuario desactivado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al desactivar usuario." });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    // Buscar usuario
    const [rows] = await pool.query("SELECT password FROM users WHERE id = ?", [
      userId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];

    // Verificar contraseña actual
    const validPassword = await bcrypt.compare(currentPassword, user.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "Contraseña actual incorrecta",
      });
    }

    // Hashear nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `
      UPDATE users 
      SET password = ?
      WHERE id = ?
      `,
      [hashedPassword, userId],
    );

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al cambiar contraseña" });
  }
};
