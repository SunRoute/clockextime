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
        daily_working_hours,
        weekly_working_hours,
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

// Actualizar usuario (solo para admin)
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      employee_number,
      employee_name,
      email,
      role_id,
      daily_working_hours,
      weekly_working_hours,
    } = req.body;

    await pool.query(
      `
      UPDATE users 
      SET employee_number = ?, employee_name = ?, email = ?, role_id = ?, daily_working_hours = ?, weekly_working_hours = ?
      WHERE id = ?
      `,
      [
        employee_number,
        employee_name,
        email,
        role_id,
        daily_working_hours,
        weekly_working_hours,
        userId,
      ],
    );

    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

// desactivar/activar usuario (solo para admin)
export const toggleUserActive = async (req, res) => {
  try {
    const userId = req.params.id;
    const loggedUserId = req.user.id;

    const [rows] = await pool.query(
      "SELECT active, role_id FROM users WHERE id = ?",
      [userId],
    );

    // Comprobar si existe el usuario
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];

    // Si se intenta desactivar a sí mismo (usuario logueado)
    if (
      parseInt(userId, 10) === parseInt(loggedUserId, 10) &&
      user.role_id === 1 &&
      user.active
    ) {
      return res.status(400).json({
        message: "No puedes desactivarte a ti mismo siendo administrador",
      });
    }

    // Si se intenta desactivar al último admin
    if (user.role_id === 1 && user.active) {
      const [admins] = await pool.query(
        "SELECT COUNT(*) as total FROM users WHERE role_id = 1 AND active = TRUE",
      );

      if (admins[0].total <= 1) {
        return res.status(400).json({
          message: "No puedes desactivar el último administrador",
        });
      }
    }

    const newStatus = !rows[0].active;

    await pool.query("UPDATE users SET active = ? WHERE id = ?", [
      newStatus,
      userId,
    ]);

    res.json({ message: "Estado actualizado", active: newStatus });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

// Resetear contraseña (solo para admin)
export const resetPassword = async (req, res) => {
  try {
    const userId = req.params.id;

    const defaultPassword = "reset1234";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    await pool.query(
      `
      UPDATE users 
      SET password = ?, password_changed = FALSE 
      WHERE id = ?
      `,
      [hashedPassword, userId],
    );

    res.json({ message: "Contraseña reseteada a reset1234" });
  } catch (error) {
    res.status(500).json({ message: "Error al resetear contraseña" });
  }
};

// Cambiar contraseña (para cualquier usuario)
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
