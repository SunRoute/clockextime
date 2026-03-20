import Card from "../ui/Card";
import "../../styles/overtimes.css";

const OvertimeSummary = ({ total, pending }) => {
  return (
    <Card>
      <div className="overtime-summary">
        <h2>Resumen</h2>
        {/* Mostrar el total de horas pendientes este mes */}
        <p>Pendientes este mes: {total}</p>
        {/* Mostrar el total de horas pendientes totales */}
        <p>Pendientes totales: {pending}</p>
      </div>
    </Card>
  );
};

export default OvertimeSummary;
