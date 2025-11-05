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
    <div style={{display:"flex", flexDirection:"column", gap:0}}>
      {days.map(day => {
        const key = formatDateKey(day);
        const evs = eventsByDate[key] || [];
        const todayClass = isToday(day) ? "today" : "";
        const hasEvents = evs.length > 0;
        const isExpanded = expandedDay === key;

        return (
          <div key={key} className={`mobile-day-card ${todayClass}`}>
            <div className="mobile-day-header">
              <div className="mobile-day-info">
                <div className={`mobile-day-date ${todayClass}`}>{day.date()}</div>
                <div className="mobile-day-weekday">{day.format("ddd, MMM D")}</div>
              </div>

              <div className="mobile-day-actions">
                {hasEvents && (
                  <div className="mobile-event-count">{evs.length} event{evs.length>1?"s":""}</div>
                )}
                {hasEvents && (
                  <button
                    className="mobile-btn"
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
            <div id={`events-${key}`}>
              {isExpanded && hasEvents && (
                <div className="mobile-events-list">
                  {evs.map(ev => (
                    <div key={ev.id} className="mobile-event-item">
                      <div className="mobile-event-time">
                        {ev.start || "All day"}
                      </div>
                      <div className="mobile-event-content">
                        <EventBadge event={ev} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* small inline preview: show first event when not expanded */}
              {!isExpanded && hasEvents && (
                <div className="mobile-preview">
                  <div className="mobile-event-item">
                    <div className="mobile-event-time">{evs[0].start || "All day"}</div>
                    <div className="mobile-event-content">
                      <EventBadge event={evs[0]} />
                    </div>
                  </div>
                  {evs.length > 1 && (
                    <div className="mobile-more-indicator">+{evs.length - 1} more</div>
                  )}
                </div>
              )}

              {!hasEvents && (
                <div className="mobile-no-events">No events</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
