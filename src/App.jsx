// src/App.jsx
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { buildCalendarGrid } from "./utils/dateUtils";
import CalendarHeader from "./components/CalendarHeader";
import CalendarGrid from "./components/CalendarGrid";

export default function App() {
  const today = dayjs();
  const [currentYear, setCurrentYear] = useState(today.year());
  const [currentMonth, setCurrentMonth] = useState(today.month()); // 0-based
  const [eventsByDate, setEventsByDate] = useState({});
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // load events.json from public
    fetch("/events.json")
      .then((r) => r.json())
      .then((data) => {
        const map = {};
        data.forEach((ev) => {
          const key = ev.date; // YYYY-MM-DD
          if (!map[key]) map[key] = [];
          map[key].push(ev);
        });
        // sort events by start time for each day
        for (const k in map) {
          map[k].sort((a,b)=> (a.start || "").localeCompare(b.start || ""));
        }
        setEventsByDate(map);
      })
      .catch((err) => console.error("Failed to load events.json", err));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
  }, [theme]);

  function gotoPrev() {
    const d = dayjs().year(currentYear).month(currentMonth).date(1).subtract(1, "month");
    setCurrentYear(d.year());
    setCurrentMonth(d.month());
  }

  function gotoNext() {
    const d = dayjs().year(currentYear).month(currentMonth).date(1).add(1, "month");
    setCurrentYear(d.year());
    setCurrentMonth(d.month());
  }

  function gotoToday() {
    const d = dayjs();
    setCurrentYear(d.year());
    setCurrentMonth(d.month());
  }

  function onMonthChange(monthIndex) {
    const d = dayjs().year(currentYear).month(monthIndex).date(1);
    setCurrentYear(d.year());
    setCurrentMonth(d.month());
  }

  function onToggleDark() {
    setTheme(t => t === "dark" ? "light" : "dark");
  }

  const calendarDays = buildCalendarGrid(currentYear, currentMonth);

  return (
    <div className="container">
      <div className="card">
        <CalendarHeader
          year={currentYear}
          month={currentMonth}
          onPrev={gotoPrev}
          onNext={gotoNext}
          onToday={gotoToday}
          onMonthChange={onMonthChange}
          onToggleDark={onToggleDark}
        />
        <CalendarGrid
          days={calendarDays}
          currentMonth={currentMonth}
          eventsByDate={eventsByDate}
        />
      </div>
    </div>
  );
}
