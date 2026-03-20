import { useEffect, useState } from "react";
import {
  getMyOvertimeRequest,
  JustifyOvertimeRequest,
} from "../../api/overtimeApi";

import OvertimeSummary from "../../components/overtimes/OvertimeSummary";
import OvertimeCard from "../../components/overtimes/OvertimeCard";

import "../../styles/overtimes.css";

const MyOvertimes = () => {
  const [overtimes, setOvertimes] = useState([]);
  const [summary, setSummary] = useState({
    total: "0h 00m",
    pending: "0h 00m",
  });

  useEffect(() => {
    loadOvertimes();
  }, []);

  const loadOvertimes = async () => {
    try {
      const response = await getMyOvertimeRequest();

      // Si no se ha logueado
      if (!response.ok) {
        console.error("Error cargando horas extra", response.data?.message);
        return;
      }

      // Normalizar datos para que sea compatible con la vista
      const normalized = response.data.map((item) => {
        const hours = parseFloat(item.overtime_hours) || 0;
        return {
          id: item.id,
          date: new Date(item.date_recorded).toLocaleDateString("es-ES"),
          date_recorded: item.date_recorded,
          hours,
          hoursFormatted: formatHoursToHoursMinutes(hours),
          status: item.overtime_status,
          reason: item.reason,
        };
      });

      // Actualizar datos
      setOvertimes(normalized);
      const summaryValues = calculateSummary(normalized);
      setSummary({
        total: formatHoursToHoursMinutes(summaryValues.pendingThisMonth),
        pending: formatHoursToHoursMinutes(summaryValues.pendingTotal),
      });
    } catch (error) {
      console.error("Error cargando horas extra", error);
    }
  };

  // Formatear tiempo a horas:minutos
  const formatHoursToHoursMinutes = (hoursDecimal) => {
    const totalMinutes = Math.round(hoursDecimal * 60);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}h ${m.toString().padStart(2, "0")}m`;
  };

  // Calcular el total de horas pendientes
  const calculateSummary = (items) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let pendingThisMonth = 0;
    let pendingTotal = 0;

    // Recorrer cada elemento
    items.forEach((item) => {
      if (item.status?.toUpperCase() === "PENDIENTE") {
        pendingTotal += item.hours;
        // Comprobar si el elemento pertenece al mes actual
        const itemDate = new Date(item.date_recorded);
        if (
          itemDate.getMonth() === currentMonth &&
          itemDate.getFullYear() === currentYear
        ) {
          pendingThisMonth += item.hours;
        }
      }
    });

    return { pendingThisMonth, pendingTotal };
  };

  // Justificar horas extra
  const handleJustify = async (id) => {
    const reason = prompt("Introduce el motivo");
    // Si no se ha introducido un motivo
    if (!reason) return;

    try {
      const response = await JustifyOvertimeRequest(id, reason);
      if (!response.ok) {
        alert(response.data?.message || "Error justificando");
        return;
      }
      loadOvertimes();
    } catch (error) {
      console.error("Error justificando", error);
    }
  };

  return (
    <section className="overtime-container">
      <OvertimeSummary total={summary.total} pending={summary.pending} />

      <div className="overtime-list">
        {overtimes.length === 0 ? (
          <p>No hay horas extra solicitadas aún.</p>
        ) : (
          overtimes.map((item) => (
            <OvertimeCard key={item.id} item={item} onJustify={handleJustify} />
          ))
        )}
      </div>
    </section>
  );
};

export default MyOvertimes;
