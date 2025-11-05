// src/components/DayCell.jsx
import React from "react";
import { formatDateKey, isToday } from "../utils/dateUtils";
import EventBadge from "./EventBadge";
import { assignEventColumns } from "../utils/overlapUtils";

export default function DayCell({ day, inCurrentMonth, events = [], onShowMore }) {
  const key = formatDateKey(day);
  const todayHighlight = isToday(day) ? "today" : "";

  const arranged = assignEventColumns(events || []);
  const maxRows = 2;
  const totalCols = arranged.length ? arranged[0].totalCols : 1;
  const visibleCount = maxRows * Math.max(1, totalCols);
  const visible = arranged.slice(0, visibleCount);
  const hiddenCount = Math.max(0, events.length - visible.length);

  const isWeekend = day.day() === 0 || day.day() === 6;

  return (
    <div className={`daycell ${todayHighlight} ${isWeekend ? "weekend" : ""}`} aria-label={`Day ${key}`}>
      <div className={`daynum ${inCurrentMonth ? "" : "othermonth"}`}>{day.date()}</div>

      <div style={{position:"relative", marginTop:8, minHeight: (maxRows * 22) + "px"}}>
        {visible.map(ev => {
          const cols = ev.totalCols || 1;
          const widthPct = 100 / cols;
          const leftPct = (ev.col || 0) * widthPct;
          const idx = arranged.findIndex(x => x.id === ev.id);
          const row = Math.floor(idx / cols);
          const topPx = row * 22;
          return (
            <div key={ev.id}
                 style={{
                   position:"absolute",
                   left: `${leftPct}%`,
                   width: `calc(${widthPct}% - 6px)`,
                   top: `${topPx}px`,
                   boxSizing:"border-box",
                   paddingRight:4
                 }}
            >
              <EventBadge event={ev} />
            </div>
          );
        })}

        {hiddenCount > 0 && (
          <div className="more" style={{position:"absolute", bottom:4, right:8}} onClick={() => onShowMore(events)}>
            {`+${hiddenCount} more`}
          </div>
        )}
      </div>
    </div>
  );
}
