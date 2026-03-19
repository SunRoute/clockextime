import { useState } from "react";
import { clockInRequest, clockOutRequest } from "../../api/timeRecordsApi";
import "../../styles/timeRecords.css";

const ClockButton = ({ hasOpenRecord, refreshRecords }) => {
  // Crear un estado para manejar el estado de carga
  const [loading, setLoading] = useState(false);

  // Función para realizar la acción de entrada/salida
  const handleClick = async () => {
    setLoading(true);

    try {
      // Verificar si hay un fichaje abierto
      if (hasOpenRecord) {
        await clockOutRequest();
      } else {
        await clockInRequest();
      }
      // Actualizar los fichajes
      refreshRecords();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Mostrar el botón de entrada/salida
    <button className="clock-button" onClick={handleClick} disabled={loading}>
      {hasOpenRecord ? "Fichar salida" : "Fichar entrada"}
    </button>
  );
};

export default ClockButton;
