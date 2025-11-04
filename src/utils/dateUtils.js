// src/utils/dateUtils.js
import dayjs from "dayjs";

export function getMonthStartDate(year, month) {
  // month: 0-based (0=Jan) to match JS Date/Dayjs .month()
  return dayjs().year(year).month(month).date(1);
}

export function buildCalendarGrid(year, month) {
  // returns an array of dayjs objects for the calendar cells (including prev/next month days)
  const firstOfMonth = getMonthStartDate(year, month);
  const startDay = firstOfMonth.day(); // 0=Sun .. 6=Sat
  const daysInMonth = firstOfMonth.daysInMonth();

  // number of leading days from previous month
  const leading = startDay; // for Sun-start week. If you want Mon-start, adjust.

  const totalCells = Math.ceil((leading + daysInMonth) / 7) * 7;
  const grid = [];

  // start from (firstOfMonth - leading days)
  const gridStart = firstOfMonth.subtract(leading, "day");

  for (let i = 0; i < totalCells; i++) {
    grid.push(gridStart.add(i, "day"));
  }
  return grid;
}

export function formatDateKey(dayjsObj) {
  return dayjsObj.format("YYYY-MM-DD");
}

export function isToday(dayjsObj) {
  return dayjsObj.isSame(dayjs(), "day");
}
