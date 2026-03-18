import { useEffect, useState } from "react";
import { getMyTimeRecordsRequest } from "../../api/timeRecordsApi";
import "./MyWorkday.css";

import ClockButton from "../../components/timeRecords/ClockButton";
import TodaySummary from "../../components/timeRecords/TodaySummary";
import TimeRecordList from "../../components/timeRecords/TimeRecordList";

const MyWorkday = () => {
  const [records, setRecords] = useState([]);

  const loadRecords = async () => {
    const response = await getMyTimeRecordsRequest();
    if (response.ok) {
      setRecords(response.data);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  // Comprobar si hay fichaje abierto
  const openRecord = records.find((r) => !r.clock_out);

  // Obtener la fecha actual
  const today = new Date().toLocaleDateString("es-ES");

  // Obtener los fichajes de hoy
  const todayRecords = records.filter(
    (r) => new Date(r.date_recorded).toLocaleDateString("es-ES") === today,
  );

  // Obtener el último fichaje de hoy
  const todayRecord = todayRecords.at(-1);

  // Calcular el total de horas trabajadas hoy
  const totalWorkedToday = todayRecords.reduce((total, record) => {
    return total + (parseFloat(record.worked_hours) || 0);
  }, 0);

  return (
    <section>
      <ClockButton hasOpenRecord={!!openRecord} refreshRecords={loadRecords} />

      <TodaySummary
        todayRecord={todayRecord}
        totalWorkedToday={totalWorkedToday}
      />

      <TimeRecordList records={records} />
    </section>
  );
};

export default MyWorkday;
