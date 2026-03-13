import { formatTime } from "../../utils/date";
import { formatWorkedTime } from "../../utils/time";

const TodaySummary = ({ todayRecord, totalWorkedToday }) => {
  // Comprobar si hay fichaje hoy
  if (!todayRecord) {
    return <p>No hay fichaje hoy.</p>;
  }

  return (
    <section className="today-summary">
      <h2>Hoy</h2>

      {/* Mostrar si hay fichaje de entrada */}
      <p>Entrada: {formatTime(todayRecord.clock_in)}</p>

      {/* Mostrar el tiempo trabajado en caso de que haya entrada y salida */}
      {todayRecord.clock_out && (
        <p>
          Total último fichaje: {formatWorkedTime(parseFloat(todayRecord.worked_hours))}
        </p>
      )}

      {/* Mostrar si no hay fichaje de salida */}
      {!todayRecord.clock_out && <p>Fichaje en curso</p>}

      {/* Mostrar el total de horas trabajadas hoy */}
      <p>Total trabajado hoy: {formatWorkedTime(totalWorkedToday)}</p>
    </section>
  );
};

export default TodaySummary;
