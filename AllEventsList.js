import React from 'react';
import './AllEventsList.css';

const AllEventsList = ({ events, onDelete }) => {
  return (
    <div className="events-list">
      <h2>All Events</h2>
      {events.map((ev, idx) => (
        <div key={idx} className="event-entry">
          <strong>{ev.title}</strong>
          {ev.dates.map((date, i) => (
            <div key={i}>
              {new Date(date).toDateString()} {ev.fromTime} - {ev.toTime}
            </div>
          ))}
          <button onClick={() => onDelete(idx)}>❌</button>
        </div>
      ))}
    </div>
  );
};

export default AllEventsList;
