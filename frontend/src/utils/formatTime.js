export const formatTime = (date) => {
  if (!date) return "00:00";

  // Interpretar la fecha como UTC y mostrar en hora local del navegador.
  const utcDateString = date.includes("T")
    ? `${date}Z`
    : `${date.replace(" ", "T")}Z`;
  const localDate = new Date(utcDateString);

  return localDate.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
