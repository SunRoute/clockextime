import "../../styles/timeRecords.css";

import TimeRecordCard from "./TimeRecordCard";

const TimeRecordList = ({ records }) => {
  // Comprobar si hay fichajes
  if (!records.length) {
    return <p>No hay fichajes registrados.</p>;
  }

  return (
    // Mostrar los fichajes
    <section className="time-record-list">
      {records.map((record) => (
        <TimeRecordCard key={record.id} record={record} />
      ))}
    </section>
  );
};

export default TimeRecordList;
