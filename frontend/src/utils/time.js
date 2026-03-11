export const formatWorkedTime = (hours) => {
  const totalMinutes = Math.round(hours * 60);

  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;

  return `${h}h ${m}m`;
};
