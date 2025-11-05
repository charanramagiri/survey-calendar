// src/components/EventBadge.jsx
import React from "react";

export default function EventBadge({ event }) {
  const label = `${event.start || ""} ${event.start ? "·" : ""} ${event.title}`;
  // color by id hash (deterministic) — simple palette
  const palette = ["#e6f0ff","#fff1e6","#e9ffef","#fff0f6","#f0f9ff"];
  const color = palette[event.id % palette.length];
  const borderColor = "#dbeafe"; // light accent

  return (
    <div
      className="event-badge"
      title={label}
      style={{
        background: color,
        border: `1px solid ${borderColor}`,
        padding: "4px 6px",
        fontSize: "0.72rem",
        borderRadius: 6,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }}
    >
      {label}
    </div>
  );
}
