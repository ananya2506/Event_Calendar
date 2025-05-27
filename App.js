import React, { useState } from 'react';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import AllEventsList from './components/AllEventsList';
import './components/Calendar.css';


const App = () => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);

  const addEvent = (newEvent) => {
    const hasConflict = events.some(ev =>
      ev.dates.some(date =>
        newEvent.dates.includes(date) &&
        (
          (ev.fromTime <= newEvent.toTime && ev.toTime >= newEvent.fromTime)
        )
      )
    );

    if (hasConflict) {
      alert("Event conflict detected!");
    } else {
      setEvents([...events, newEvent]);
      setShowForm(false);
    }
  };

  const handleDelete = (index) => {
    const updated = [...events];
    updated.splice(index, 1);
    setEvents(updated);
  };

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  return (
    <div className="app">
      <h1>📅 Event Calendar</h1>
      <div className="month-nav">
        <button onClick={() => changeMonth(-1)}>⬅ Prev</button>
        <span>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</span>
        <button onClick={() => changeMonth(1)}>Next ➡</button>
      </div>

      <button className="add-btn" onClick={() => setShowForm(!showForm)}>+ Add Event</button>
      {showForm && <EventForm onAdd={addEvent} />}
      <Calendar events={events} currentDate={currentDate} />
      <AllEventsList events={events} onDelete={handleDelete} />
    </div>
  );
};

export default App;
