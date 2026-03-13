import { formatTime } from "../../utils/date";
import { formatWorkedTime } from "../../utils/time";

const TimeRecordCard = ({ record }) => {
  return (
    <article className="time-record-card">
      <div className="record-date">
        {/* Mostrar la fecha de la entrada */}
        {new Date(record.date_recorded).toLocaleDateString("es-ES")}
      </div>

      <div className="record-times">
        {/* Mostrar las horas de entrada y salida */}
        <span>{formatTime(record.clock_in)}</span>
        <span>→</span>
        <span>
          {/* Mostrar la hora de salida, o "En curso" si no hay salida */}
          {record.clock_out ? formatTime(record.clock_out) : "En curso"}
        </span>
      </div>

      <div className="record-hours">
        {/* Mostrar las horas trabajadas, o '-' si no hay horas trabajadas */}
        {record.worked_hours ? formatWorkedTime(record.worked_hours) : "-"}
      </div>
    </article>
  );
};

export default TimeRecordCard;
