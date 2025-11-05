// src/utils/overlapUtils.js
// Simple greedy algorithm to assign columns to overlapping events
// Each event should have: { id, start: "HH:mm", durationMinutes:number }
// Returns a new array of events with { ...event, startMins, endMins, col, totalCols }

function timeToMinutes(hhmm) {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  }
  
  export function assignEventColumns(events) {
    // clone and compute numerical intervals
    const evs = events.map(e => {
      const startMins = timeToMinutes(e.start || "00:00");
      const dur = e.durationMinutes || 60;
      const endMins = startMins + dur;
      return { ...e, startMins, endMins, col: -1, totalCols: 1 };
    });
  
    // sort by start, then by longer first maybe
    evs.sort((a, b) => a.startMins - b.startMins || (b.endMins - b.startMins) - (a.endMins - a.startMins));
  
    // active columns: array of end time per column
    const colsEnd = []; // index -> endMins
  
    for (const e of evs) {
      // find first column that is free (ends <= e.startMins)
      let assigned = false;
      for (let i = 0; i < colsEnd.length; i++) {
        if (colsEnd[i] <= e.startMins) {
          // place here
          e.col = i;
          colsEnd[i] = e.endMins;
          assigned = true;
          break;
        }
      }
      if (!assigned) {
        // make a new column
        e.col = colsEnd.length;
        colsEnd.push(e.endMins);
      }
    }
  
    // total columns = number of simultaneous columns needed
    const totalCols = colsEnd.length;
    for (const e of evs) e.totalCols = totalCols;
  
    return evs;
  }
  