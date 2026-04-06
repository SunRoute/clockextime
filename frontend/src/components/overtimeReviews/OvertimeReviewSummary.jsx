import Card from "../ui/Card";
import "../../styles/overtimeReviews.css";

const OvertimeReviewSummary = ({ totalPending, totalHours }) => {
  return (
    <Card>
      <div className="overtime-review-summary">
        <h2>Resumen</h2>
        {/* Mostrar el total de peticiones pendientes */}
        <p>Peticiones pendientes: {totalPending}</p>
        {/* Mostrar el total de horas pendientes de autorización */}
        <p>Horas pendientes de autorizar: {totalHours}</p>
      </div>
    </Card>
  );
};

export default OvertimeReviewSummary;
