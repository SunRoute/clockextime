import pool from "../config/db.js";

export const clockIn = async (req, res) => {
  try {
    const userId = req.user.id; // Uso de JWT

    // Verificar si existe fichaje abierto
    const [openTimeRecord] = await pool.query(
      "SELECT * FROM time_records WHERE user_id = ? AND clock_out IS NULL",
      [userId],
    );

    if (openTimeRecord.length > 0) {
      return res.status(400).json({
        message: "Ya tiene un fichaje abierto.",
      });
    }

    // Crear nuevo fichaje
    await pool.query(
      "INSERT INTO time_records (user_id, date_recorded, clock_in) VALUES (?, CURDATE(), NOW())",
      [userId],
    );

    res.json({ message: "Entrada registrada correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar entrada." });
  }
};

export const clockOut = async (req, res) => {
  try {
    const userId = req.user.id; // Uso de JWT

    // Buscar fichaje abierto y calcular segundos trabajados en SQL
    const [rows] = await pool.query(
      `
      SELECT
        time_records.id,
        time_records.clock_in,
        TIMESTAMPDIFF(SECOND, time_records.clock_in, NOW()) AS seconds_worked, users.daily_working_hours
      FROM time_records
      JOIN users ON time_records.user_id = users.id
      WHERE time_records.user_id = ?
        AND time_records.clock_out IS NULL
      LIMIT 1
      `,
      [userId],
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "No hay fichaje abierto." });
    }

    const timeRecord = rows[0];
    // Convertir segundos a horas
    const hoursWorked = timeRecord.seconds_worked / 3600;
    const roundedHours = Number(hoursWorked.toFixed(2));

    // Comparar con jornada real del usuario
    const possibleOvertime = roundedHours > timeRecord.daily_working_hours;

    // Cerrar fichaje
    await pool.query(
      "UPDATE time_records SET clock_out = NOW(), worked_hours = ?, possible_overtime = ? WHERE id = ?",
      [roundedHours, possibleOvertime, timeRecord.id],
    );

    // Registrar horas extras si las hay
    if (possibleOvertime) {
      const overtimeHours = Number(
        (roundedHours - timeRecord.daily_working_hours).toFixed(2),
      );

      await pool.query(
        "INSERT INTO overtimes (time_record_id, overtime_hours) VALUES (?, ?)",
        [timeRecord.id, overtimeHours],
      );
    }

    res.json({
      message: "Salida registrada",
      worked_hours: roundedHours,
      possible_overtime: possibleOvertime,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar salida." });
  }
};
