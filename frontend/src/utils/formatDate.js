export const formatDate = (date) => {
  if (!date) return "00/00/0000";

  return new Date(date).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
