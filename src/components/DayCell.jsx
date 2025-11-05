// src/components/DayCell.jsx
import React from "react";
import { formatDateKey, isToday } from "../utils/dateUtils";
import EventBadge from "./EventBadge";
import { assignEventColumns } from "../utils/overlapUtils";

export default function DayCell({ day, inCurrentMonth, events = [], onShowMore }) {
  const key = formatDateKey(day);
  const todayHighlight = isToday(day) ? "today" : "";

  // compute layout
  const arranged = assignEventColumns(events || []);

  // We will still limit visible rows but allow horizontal columns.
  const maxRows = 2; // rows of stacked rows inside the cell (you may adjust)
  // Group events by vertical row index. For simplicity, assign each event to row 0..maxRows-1 round-robin by start time.
  // But better: show up to (maxRows) rows of event "bars" (each row can have multiple columns)
  // We'll take the simplest path: show up to maxRows * totalCols badges visually (but they will be positioned).
  const totalCols = arranged.length ? arranged[0].totalCols : 1;

  // Visible: show up to (maxRows * totalCols) events (if more, show +n)
  const visibleCount = maxRows * Math.max(1, totalCols);
  const visible = arranged.slice(0, visibleCount);
  const hiddenCount = Math.max(0, events.length - visible.length);

  return (
    <div className={`daycell ${todayHighlight}`} aria-label={`Day ${key}`}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div className={`daynum ${inCurrentMonth ? "" : "othermonth"}`}>{day.date()}</div>
      </div>

      <div style={{position:"relative", marginTop:8, minHeight: (maxRows * 22) + "px"}}>
        {/* render visible events positioned horizontally by column */}
        {visible.map(ev => {
          // compute width% and left% based on columns
          const cols = ev.totalCols || 1;
          const widthPct = 100 / cols;
          const leftPct = (ev.col || 0) * widthPct;
          // For stacking rows we can offset top by rowIndex; here we'll place all in flow and use transform for small vertical shift.
          // Keep a small vertical spacing per 'row' - compute row by Math.floor(index / cols) so events fill first row then second, etc.
          const idx = arranged.findIndex(x => x.id === ev.id);
          const row = Math.floor(idx / cols);
          const topPx = row * 22; // 22px per row
          return (
            <div key={ev.id}
                 style={{
                   position:"absolute",
                   left: `${leftPct}%`,
                   width: `calc(${widthPct}% - 6px)`, // small gap
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
          <div className="more" style={{position:"absolute", bottom:2, right:4}} onClick={() => onShowMore(events)}>
            {`+${hiddenCount} more`}
          </div>
        )}
      </div>
    </div>
  );
}
