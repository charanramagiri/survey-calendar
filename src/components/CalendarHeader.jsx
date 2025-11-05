// src/components/CalendarHeader.jsx
import React from "react";
import PropTypes from "prop-types";

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export default function CalendarHeader({
  year,
  month,
  onPrev,
  onNext,
  onToday,
  onMonthChange,
  onToggleDark
}) {
  return (
    <div className="cal-header" role="banner">
      {/* top row left */}
      <div className="left">
        <button className="icon-btn" onClick={onPrev} aria-label="Previous month">
          ‹
        </button>
        <button className="icon-btn" onClick={onNext} aria-label="Next month">
          ›
        </button>
      </div>

      {/* center title row */}
      <div className="title" aria-hidden>
        <div className="month-big" title={`${monthNames[month]} ${year}`}>
          {monthNames[month]}
        </div>
        <div className="year-small">{year}</div>
      </div>

      {/* top row right */}
      <div className="right">
        <button className="today-btn" onClick={onToday} aria-label="Go to today">
          Today
        </button>

        {/* Compact month dropdown (shows Jan, Feb, etc.) */}
        <select
          className="month-select"
          value={month}
          onChange={(e) => onMonthChange(Number(e.target.value))}
          aria-label="Select month"
        >
          {monthNames.map((m, i) => (
            <option key={m} value={i}>
              {m.slice(0, 3)}
            </option>
          ))}
        </select>

        <button className="icon-btn" onClick={onToggleDark} aria-label="Toggle theme">
          🌓
        </button>
      </div>
    </div>
  );
}

CalendarHeader.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onToday: PropTypes.func.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  onToggleDark: PropTypes.func.isRequired
};
