// src/components/MobileDayList.jsx
import React, { useState } from "react";
import { formatDateKey, isToday } from "../utils/dateUtils";
import EventBadge from "./EventBadge";

/**
 * MobileDayList
 * - days: array of dayjs objects (only days for current month)
 * - eventsByDate: map YYYY-MM-DD -> events[]
 *
 * Renders a vertical list: Date header + stacked events (full width).
 * Each day can expand/collapse if there are many events.
 */
export default function MobileDayList({ days, eventsByDate }) {
  const [expandedDay, setExpandedDay] = useState(null);

  return (
    <div style={{display:"flex", flexDirection:"column", gap:10}}>
      {days.map(day => {
        const key = formatDateKey(day);
        const evs = eventsByDate[key] || [];
        const todayClass = isToday(day) ? "today" : "";
        const hasEvents = evs.length > 0;
        const isExpanded = expandedDay === key;

        return (
          <div key={key} className="card" style={{padding:12}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", gap:8}}>
              <div style={{display:"flex", alignItems:"center", gap:8}}>
                <div className={`daynum ${todayClass}`} style={{fontSize:16}}>{day.date()}</div>
                <div style={{color:"#6b7280"}}>{day.format("ddd, MMM D")}</div>
              </div>

              <div style={{display:"flex", alignItems:"center", gap:8}}>
                {hasEvents && <div style={{fontSize:13, color:"#374151"}}>{evs.length} event{evs.length>1?"s":""}</div>}
                {hasEvents && (
                  <button
                    className="btn"
                    onClick={() => setExpandedDay(isExpanded ? null : key)}
                    aria-expanded={isExpanded}
                    aria-controls={`events-${key}`}
                  >
                    {isExpanded ? "Collapse" : "View"}
                  </button>
                )}
              </div>
            </div>

            {/* events area */}
            <div id={`events-${key}`} style={{marginTop:10}}>
              {isExpanded && hasEvents && (
                <div style={{display:"flex", flexDirection:"column", gap:8}}>
                  {evs.map(ev => (
                    <div key={ev.id} style={{display:"flex", gap:8, alignItems:"center"}}>
                      <div style={{minWidth:56, fontSize:13, color:"#374151"}}>
                        {ev.start || "All day"}
                      </div>
                      <div style={{flex:1}}>
                        <EventBadge event={ev} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* small inline preview: show first event when not expanded */}
              {!isExpanded && hasEvents && (
                <div style={{display:"flex", flexDirection:"column", gap:6}}>
                  <div style={{display:"flex", gap:8, alignItems:"center"}}>
                    <div style={{minWidth:56, fontSize:13}}>{evs[0].start || "All day"}</div>
                    <div style={{flex:1}}>
                      <EventBadge event={evs[0]} />
                    </div>
                  </div>
                  {evs.length > 1 && <div style={{color:"#6b7280", fontSize:13}}>+{evs.length - 1} more</div>}
                </div>
              )}

              {!hasEvents && (
                <div style={{color:"#9ca3af", fontSize:13, marginTop:2}}>No events</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
