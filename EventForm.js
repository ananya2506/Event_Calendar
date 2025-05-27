import React, { useState } from 'react';
import './EventForm.css';

const EventForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [recurrence, setRecurrence] = useState('once');
  const [customDates, setCustomDates] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleCustomDateChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setCustomDates(selected);
  };

  const generateDates = () => {
    if (recurrence === 'once') return [startDate];

    const dates = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    while (start <= end) {
      dates.push(new Date(start).toISOString().split('T')[0]);
      if (recurrence === 'daily') start.setDate(start.getDate() + 1);
      else if (recurrence === 'weekly') start.setDate(start.getDate() + 7);
      else if (recurrence === 'monthly') start.setMonth(start.getMonth() + 1);
    }

    return dates;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dates = recurrence === 'custom' ? customDates : generateDates();
    onAdd({ title, fromTime, toTime, dates });
    setTitle('');
    setFromTime('');
    setToTime('');
    setStartDate('');
    setEndDate('');
    setCustomDates([]);
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <input placeholder="Event Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input type="time" value={fromTime} onChange={e => setFromTime(e.target.value)} required />
      <input type="time" value={toTime} onChange={e => setToTime(e.target.value)} required />
      <select value={recurrence} onChange={e => setRecurrence(e.target.value)}>
        <option value="once">Once</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="custom">Custom</option>
      </select>

      {(recurrence === 'once' || recurrence !== 'custom') && (
        <>
          <label>From Date</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
          {(recurrence !== 'once' && recurrence !== 'custom') && (
            <>
              <label>To Date</label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
            </>
          )}
        </>
      )}

      {recurrence === 'custom' && (
        <>
          <label>Select Custom Dates (Ctrl+Click)</label>
          <select multiple size="5" onChange={handleCustomDateChange}>
            {[...Array(31)].map((_, i) => {
              const d = new Date();
              d.setDate(i + 1);
              return (
                <option key={i} value={d.toISOString().split('T')[0]}>
                  {d.toDateString()}
                </option>
              );
            })}
          </select>
        </>
      )}

      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
