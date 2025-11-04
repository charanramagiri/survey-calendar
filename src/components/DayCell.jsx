import React from "react";
import { formatDateKey, isToday } from "../utils/dateUtils";
import EventBadge from "./EventBadge";

export default function DayCell({ day, inCurrentMonth, events, onShowMore }) {
  const key = formatDateKey(day);
  const todayHighlight = isToday(day) ? "today" : "";

  // show max 2 badges; if more, show +n more
  const maxVisible = 2;
  const visible = events.slice(0, maxVisible);
  const hiddenCount = Math.max(0, events.length - maxVisible);

  return (
    <div className={`daycell ${todayHighlight}`} aria-label={`Day ${key}`}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div className={`daynum ${inCurrentMonth ? "" : "othermonth"}`}>{day.date()}</div>
      </div>

      <div className="events">
        {visible.map(ev => <EventBadge key={ev.id} event={ev} />)}
        {hiddenCount > 0 && (
          <div className="more" onClick={() => onShowMore(events)}>{`+${hiddenCount} more`}</div>
        )}
      </div>
    </div>
  );
}
