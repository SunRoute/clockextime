import pool from "../config/db.js";
import { getUTCTimestamp } from "../utils/date.js";

export const clockIn = async (req, res) => {
  try {
    const userId = req.user.id; // Uso de JWT

    const clockIn = getUTCTimestamp();
    const dateRecorded = clockIn.slice(0, 10);

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
      "INSERT INTO time_records (user_id, date_recorded, clock_in) VALUES (?, ?, ?)",
      [userId, dateRecorded, clockIn],
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

    const clockOut = getUTCTimestamp();

    // Buscar fichaje abierto
    const [rows] = await pool.query(
      `
      SELECT
        time_records.id,
        time_records.clock_in,
        users.daily_working_hours
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

    // Calcular con JavaScript para evitar desfases de zona horaria de MySQL
    const clockInDate = new Date(timeRecord.clock_in);
    const clockOutDate = new Date(clockOut);
    const secondsWorked = Math.round((clockOutDate - clockInDate) / 1000);

    // Convertir segundos a horas
    const hoursWorked = secondsWorked / 3600;
    const roundedHours = Number(hoursWorked.toFixed(2));

    // Comparar con jornada real del usuario
    const possibleOvertime = roundedHours > timeRecord.daily_working_hours;

    // Cerrar fichaje
    await pool.query(
      "UPDATE time_records SET clock_out = ?, worked_hours = ?, possible_overtime = ? WHERE id = ?",
      [clockOut, roundedHours, possibleOvertime, timeRecord.id],
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

export const getMyTimeRecords = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await pool.query(
      `
      SELECT 
        id,
        date_recorded,
        clock_in,
        clock_out,
        worked_hours,
        possible_overtime
      FROM time_records
      WHERE user_id = ?
      ORDER BY date_recorded DESC
      `,
      [userId],
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener fichajes." });
  }
};
