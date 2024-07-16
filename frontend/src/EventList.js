import React from 'react';

const EventList = ({ events }) => {
  return (
    <div className="event-list">
      <h2>Scheduled Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <strong>{event.title}</strong><br />
            {new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}<br />
            <em>Assigned to: {event.user ? event.user.name : 'No user assigned'}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;