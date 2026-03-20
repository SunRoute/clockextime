import Card from "../ui/Card";
import Button from "../ui/Button";
import "../../styles/overtimes.css";

const OvertimeCard = ({ item, onJustify }) => {
  return (
    <Card>
      <article className="overtime-card">
        <div className="overtime-header">
          {/* Mostrar la fecha y horas de la hora extra */}
          <span className="overtime-date">
            {item.date} - {item.hoursFormatted}
          </span>
          {/* Mostrar el estado de la hora extra */}
          <span className="overtime-status">{item.status}</span>
        </div>
        {/* Mostrar el motivo de la hora extra, si existe */}
        {item.reason && (
          <p className="overtime-reason">Motivo: {item.reason}</p>
        )}
        {/* Mostrar el botón de justificación, si no hay motivo */}
        {!item.reason && (
          <Button onClick={() => onJustify(item.id)}>Justificar</Button>
        )}
      </article>
    </Card>
  );
};

export default OvertimeCard;
