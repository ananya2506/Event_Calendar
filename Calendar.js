import React from 'react';
import './Calendar.css';

const Calendar = ({ events, currentDate }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const dates = [];
  for (let i = 0; i < firstDay; i++) dates.push(null);
  for (let i = 1; i <= daysInMonth; i++) dates.push(new Date(year, month, i));

  return (
    <div className="calendar">
      <div className="grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div className="day-header" key={day}>{day}</div>
        ))}

        {dates.map((date, idx) => (
          <div key={idx} className={`cell ${date && date.toDateString() === today.toDateString() ? 'today' : ''}`}>
            {date && (
              <>
                <div className="date-number">{date.getDate()}</div>
                {events.map((event, index) => (
                  event.dates.some(d => new Date(d).toDateString() === date.toDateString()) && (
                    <div key={index} className="event">
                      {event.title}
                    </div>
                  )
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
