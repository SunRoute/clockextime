import pool from "../config/db.js";

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

    await pool.query(
      `
      INSERT INTO users 
      (employee_number, employee_name, email, password, role_id)
      VALUES (?, ?, ?, ?, ?)
      `,
      [employee_number, employee_name, email, password, role_id],
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
