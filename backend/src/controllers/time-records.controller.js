import pool from "../config/db.js";

export const clockIn = async (req, res) => {
  try {
    const userId = 1; //req.user.id; // vendrá del middleware auth

    // Verificar si existe fichaje abierto
    const [openTimeRecords] = await pool.query(
      "SELECT * FROM time_records WHERE user_id = ? AND clock_out IS NULL",
      [userId],
    );

    if (openTimeRecords.length > 0) {
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
    const userId = 1; // temporal

    // Buscar fichaje abierto
    const [rows] = await pool.query(
      "SELECT * FROM time_records WHERE user_id = ? AND clock_out IS NULL LIMIT 1",
      [userId],
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "No hay fichaje abierto." });
    }

    const timeRecord = rows[0];

    const timeClockIn = new Date(timeRecord.clock_in);
    const timeClockOut = new Date();

    const diffMs = timeClockOut - timeClockIn;
    const hours = diffMs / (1000 * 60 * 60);

    const roundedHours = Number(hours.toFixed(2));

    // Obtener jornada real del usuario
    const [userRows] = await pool.query(
      "SELECT daily_working_hours FROM users WHERE id = ?",
      [userId],
    );

    const dailyWorkingHours = userRows[0].daily_working_hours;

    const possibleOvertime = roundedHours > dailyWorkingHours;

    await pool.query(
      "UPDATE time_records SET clock_out = NOW(), worked_hours = ?, possible_overtime = ? WHERE id = ?",
      [roundedHours, possibleOvertime, timeRecord.id],
    );

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
