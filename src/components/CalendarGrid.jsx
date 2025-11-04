import React, { useState } from "react";
import { formatDateKey, isToday } from "../utils/dateUtils";
import DayCell from "./DayCell";

const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function CalendarGrid({ days, currentMonth, eventsByDate }) {
  const [modalEvents, setModalEvents] = useState(null); // optional for when showing +n more

  return (
    <>
      <div className="calendar">
        {weekdays.map(w => <div key={w} className="weekday">{w}</div>)}
      </div>
      <div className="calendar" style={{marginTop:8}}>
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
              onShowMore={(events) => setModalEvents(events)}
            />
          );
        })}
      </div>

      {/* simple modal replacement: show list when modalEvents is set */}
      {modalEvents && (
        <div style={{
          position:"fixed", inset:0, background:"rgba(0,0,0,0.4)",
          display:"flex", alignItems:"center", justifyContent:"center"
        }} onClick={() => setModalEvents(null)}>
          <div style={{background:"#fff", padding:16, borderRadius:8, minWidth:320}} onClick={(e)=>e.stopPropagation()}>
            <h3>Events</h3>
            <ul>
              {modalEvents.map(ev => <li key={ev.id}>{ev.start} — {ev.title}</li>)}
            </ul>
            <div style={{textAlign:"right", marginTop:8}}>
              <button className="btn" onClick={() => setModalEvents(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
