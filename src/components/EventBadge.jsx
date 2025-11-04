import React from "react";

export default function EventBadge({ event }) {
  // compute small label: 10:00 • Team Sync
  const label = `${event.start} · ${event.title}`;
  // simple visual conflict indicator: if two events have same start, show !
  return (
    <div className="event-badge" title={label}>
      {label}
    </div>
  );
}
