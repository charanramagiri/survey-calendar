// src/components/CalendarGrid.jsx
import React, { useEffect, useState } from "react";
import { formatDateKey } from "../utils/dateUtils";
import DayCell from "./DayCell";
import MobileDayList from "./MobileDayList";

const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function CalendarGrid({ days, currentMonth, eventsByDate }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 700);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // For mobile, we want only the days belonging to the current month (no prev/next month spills).
  const monthDays = days.filter(d => d.month() === currentMonth);

  if (isMobile) {
    return (
      <MobileDayList days={monthDays} eventsByDate={eventsByDate} />
    );
  }

  return (
    <>
      <div className="calendar weekdays-row">
        {weekdays.map(w => <div key={w} className="weekday">{w}</div>)}
      </div>
      <div className="calendar days-row">
        {days.map((d) => {
          const key = formatDateKey(d);
          const inCurrentMonth = d.month() === currentMonth;
          const evs = eventsByDate[key] || [];
          return (
            <DayCell
              key={key}
              day={d}
              inCurrentMonth={inCurrentMonth}
              events={evs}
              onShowMore={(events) => {
                // fallback: native alert if modal not present
                alert(events.map(e => `${e.start || ""} ${e.title}`).join("\n"));
              }}
            />
          );
        })}
      </div>
    </>
  );
}
