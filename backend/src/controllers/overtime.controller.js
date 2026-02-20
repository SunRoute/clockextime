import pool from "../config/db.js";

// Admin obtiene horas extra pendientes
export const getPendingOvertimes = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT 
        overtimes.id,
        users.employee_name,
        overtimes.overtime_hours,
        overtimes.reason,
        overtimes.overtime_status,
        time_records.date_recorded
      FROM overtimes
      JOIN time_records ON overtimes.time_record_id = time_records.id
      JOIN users ON time_records.user_id = users.id
      WHERE overtimes.overtime_status = 'pendiente'
      `,
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener horas extra." });
  }
};

// Admin aprueba o rechaza horas extra
export const updateOvertimeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'aprobada' o 'rechazada'

    await pool.query("UPDATE overtimes SET overtime_status = ? WHERE id = ?", [
      status,
      id,
    ]);

    res.json({ message: "Estado actualizado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar estado." });
  }
};

// Empleado añade motivo a horas extra pendientes
export const addOvertimeReason = async (req, res) => {
  try {
    const overtimeId = req.params.id;
    const userId = req.user.id;
    const { reason } = req.body;

    // Comprobar que el overtime pertenece al usuario logueado y está pendiente
    const [rows] = await pool.query(
      `
      SELECT overtimes.id
      FROM overtimes
      JOIN time_records ON overtimes.time_record_id = time_records.id
      WHERE overtimes.id = ?
        AND time_records.user_id = ?
        AND overtimes.overtime_status = 'pendiente'
      `,
      [overtimeId, userId],
    );

    if (rows.length === 0) {
      return res.status(403).json({
        message: "No autorizado o registro no existe.",
      });
    }

    // Actualizar motivo
    await pool.query("UPDATE overtimes SET reason = ? WHERE id = ?", [
      reason,
      overtimeId,
    ]);

    res.json({ message: "Motivo registrado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar motivo." });
  }
};
