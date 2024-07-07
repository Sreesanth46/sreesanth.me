const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const monthWithYear = (date: Date) => {
  const year = date.getFullYear();
  const month = months[date.getMonth()];

  return `${month} ${year}`;
};

export const monthWithDay = (date: Date) => {
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  return {
    year,
    dayWithMonth: `${month} ${day}`,
  };
};
