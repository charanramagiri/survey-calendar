// src/components/EventBadge.jsx
import React from "react";
import "./EventBadge.css";

export default function EventBadge({ event }) {
  const label = `${event.start ? event.start + " · " : ""}${event.title}`;
  // Use a more vibrant and accessible color palette
  const palette = [
    "#2563EB", // Blue
    "#dc2626", // Red
    "#16a34a", // Green
    "#ea580c", // Orange
    "#9333ea", // Purple
    "#0891b2", // Cyan
    "#be185d", // Pink
    "#ca8a04"  // Yellow
  ];
  const color = palette[(event.id || 0) % palette.length];

  return (
    <div className="event-badge compact" tabIndex={0} style={{background: color}}>
      <span className="ev-label">
        {label}
      </span>

      <div className="ev-tooltip" role="tooltip" aria-hidden>
        <div className="tp-title">{event.title}</div>
        <div className="tp-time">
          {event.start ? event.start : "All day"}
          {event.durationMinutes ? ` • ${event.durationMinutes}m` : ""}
        </div>
        {event.description && <div className="tp-desc">{event.description}</div>}
      </div>
    </div>
  );
}
