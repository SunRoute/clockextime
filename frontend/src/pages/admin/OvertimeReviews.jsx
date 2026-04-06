import { useEffect, useState } from "react";
import {
  getPendingOvertimeRequest,
  manageOvertimeRequest,
} from "../../api/overtimeReviewApi";

import OvertimeReviewCard from "../../components/overtimeReviews/OvertimeReviewCard";
import OvertimeReviewSummary from "../../components/overtimeReviews/OvertimeReviewSummary";

import "../../styles/overtimeReviews.css";

const OvertimeReviews = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await getPendingOvertimeRequest();
    if (res.ok) {
      const normalized = res.data.map((req) => ({
        ...req,
        hoursFormatted: formatHoursToHoursMinutes(req.overtime_hours),
      }));
      setRequests(normalized);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Formatear tiempo
  const formatHoursToHoursMinutes = (hoursDecimal) => {
    const totalMinutes = Math.round(hoursDecimal * 60);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}h ${m.toString().padStart(2, "0")}m`;
  };

  // Sumar horas
  const totalPending = requests.length;

  const totalHoursDecimal = requests.reduce(
    (acc, r) => acc + Number(r.overtime_hours || 0),
    0,
  );
  const totalHours = formatHoursToHoursMinutes(totalHoursDecimal);

  // Acciones sobre la solicitud
  const handleOvertimeStatus = async (id, status) => {
    const confirm = window.confirm(`Confirmar solicitud ${status}`);
    if (!confirm) return;

    const res = await manageOvertimeRequest(id, status);
    if (!res.ok) {
      alert("Error al actualizar estado de horas extra");
      return;
    }

    fetchRequests();
  };

  const handleApprove = (id) => handleOvertimeStatus(id, "aprobada");
  const handleReject = (id) => handleOvertimeStatus(id, "rechazada");

  return (
    <section className="overtime-review-container">
      <OvertimeReviewSummary
        totalPending={totalPending}
        totalHours={totalHours}
      />

      <div className="overtime-review-list">
        {requests.map((req) => (
          <OvertimeReviewCard
            key={req.id}
            request={req}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
      </div>
    </section>
  );
};

export default OvertimeReviews;
