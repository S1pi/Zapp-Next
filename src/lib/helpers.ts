const stringifyDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export const capitalizeFirstLetter = (s: string): string => {
  if (s.length === 0) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export default stringifyDate;
