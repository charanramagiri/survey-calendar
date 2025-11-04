import React from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export default function CalendarHeader({ year, month, onPrev, onNext }) {
  return (
    <>
      <div style={{display:"flex", alignItems:"center", gap:8}}>
        <button className="btn" onClick={onPrev} aria-label="Previous month">◀</button>
        <div className="month">{monthNames[month]} {year}</div>
        <button className="btn" onClick={onNext} aria-label="Next month">▶</button>
      </div>
      <div style={{marginLeft:"auto", color:"#6b7280", fontSize:".9rem"}}>
        <div>Highlight: Today's date</div>
      </div>
    </>
  );
}

CalendarHeader.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};
