import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function CalendarView() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    start: new Date(),
    end: new Date()
  });

  const handleDateClick = (date) => {
    const overlappingEvent = events.find(event =>
      moment(date).isBetween(event.start, event.end, null, '[)')
    );

    if (overlappingEvent) {
      alert(`The time slot has already an appointment scheduled for "${overlappingEvent.title}"`);
      return;
    }

    setFormData({
      id: null,
      title: '',
      description: '',
      start: date,
      end: date
    });
    setShowForm(true);
  };

  const handleEventClick = (event) => {
    setFormData({
      id: event.id,
      title: event.title,
      description: event.description,
      start: event.start,
      end: event.end
    });
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const newEvent = {
      ...formData,
      start: new Date(formData.start),
      end: new Date(formData.end),
      id: formData.id ?? new Date().getTime()
    };

    const isExactOverlap = events.some(event =>
      moment(newEvent.start).isBetween(event.start, event.end, null, '[)') ||
      moment(newEvent.end).isBetween(event.start, event.end, null, '[)')
    );

    if (isExactOverlap && formData.id === null) {
      alert(`The time slot has already an appointment scheduled for "${events.find(event =>
        moment(newEvent.start).isBetween(event.start, event.end, null, '[)')
      ).title}"`);
      return;
    }

    if (formData.id === null) {
      setEvents(prevEvents => [...prevEvents, newEvent]);
    } else {
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === formData.id ? newEvent : event
        )
      );
    }
    setShowForm(false);
  };

  const handleRemove = () => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== formData.id));
    setShowForm(false);
  };

  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        onSelectSlot={slotInfo => handleDateClick(slotInfo.start)}
        onSelectEvent={event => handleEventClick(event)}
        selectable
      />
      {showForm && (
        <div className="form-container">
          <h3>{formData.id === null ? 'Add Event' : 'Edit Event'}</h3>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Start Date:
            <input
              type="datetime-local"
              name="start"
              value={moment(formData.start).format('YYYY-MM-DDTHH:mm')}
              onChange={handleChange}
            />
          </label>
          <label>
            End Date:
            <input
              type="datetime-local"
              name="end"
              value={moment(formData.end).format('YYYY-MM-DDTHH:mm')}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSubmit}>
            {formData.id === null ? 'Save' : 'Update'}
          </button>
          {formData.id !== null && (
            <button onClick={handleRemove} style={{ backgroundColor: 'red', color: 'white' }}>
              Remove
            </button>
          )}
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default CalendarView;