import dayjs from "dayjs";

export function getCurrentWeek() {
  const today = dayjs();
  const startOfWeek = today.startOf("week").startOf("day").add(1, "day");
  const endOfWeek = today.endOf("week").endOf("day").add(1, "day");

  return [startOfWeek, endOfWeek];
}

export function getDaysBetweenDates(startDate, endDate) {
  const days = [];
  let currentDate = dayjs(startDate);

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, "day")) {
    days.push(currentDate.format("DD-MM-YYYY"));
    currentDate = currentDate.add(1, "day");
  }

  return days;
}
