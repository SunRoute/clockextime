import Card from "../ui/Card";
import Button from "../ui/Button";

const OvertimeReviewCard = ({ request, onApprove, onReject }) => {
  return (
    <Card>
      <article className="overtime-review-card">
        {/* Mostrar el nombre del empleado y nº empleado */}
        <span className="overtime-review-employee">
          {request.employee_name} - {request.employee_number}
        </span>
        {/* Mostrar la fecha y horas de la hora extra */}
        <p>
          {request.date_recorded} · {request.hoursFormatted}
        </p>
        {/* Mostrar el motivo de la hora extra, si existe */}
        <p>Motivo: {request.reason}</p>
        {/* Mostrar el botón de autorización o rechazo */}
        <div className="card-buttons">
          <Button onClick={() => onApprove?.(request.id)}>Autorizar</Button>
          <Button onClick={() => onReject?.(request.id)}>Rechazar</Button>
        </div>
      </article>
    </Card>
  );
};

export default OvertimeReviewCard;
