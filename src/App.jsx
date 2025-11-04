import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { buildCalendarGrid, formatDateKey, isToday } from "./utils/dateUtils";
import CalendarHeader from "./components/CalendarHeader";
import CalendarGrid from "./components/CalendarGrid";

export default function App() {
  const today = dayjs();
  const [currentYear, setCurrentYear] = useState(today.year());
  const [currentMonth, setCurrentMonth] = useState(today.month()); // 0-based
  const [events, setEvents] = useState([]); // raw array
  const [eventsByDate, setEventsByDate] = useState({});

  useEffect(() => {
    // load events.json from public
    fetch("/events.json")
      .then((r) => r.json())
      .then((data) => {
        setEvents(data);
        const map = {};
        data.forEach((ev) => {
          const key = ev.date; // expecting YYYY-MM-DD
          if (!map[key]) map[key] = [];
          map[key].push(ev);
        });
        // optional: sort events for each day by start time
        for (const k in map) {
          map[k].sort((a, b) => a.start.localeCompare(b.start));
        }
        setEventsByDate(map);
      })
      .catch((err) => {
        console.error("Failed to load events.json", err);
      });
  }, []);

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

  const calendarDays = buildCalendarGrid(currentYear, currentMonth);

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <CalendarHeader
            year={currentYear}
            month={currentMonth}
            onPrev={gotoPrev}
            onNext={gotoNext}
          />
        </div>
        <CalendarGrid
          days={calendarDays}
          currentMonth={currentMonth}
          eventsByDate={eventsByDate}
        />
      </div>
    </div>
  );
}
