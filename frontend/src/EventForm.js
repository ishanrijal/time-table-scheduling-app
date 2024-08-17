import React, { useState } from 'react';
import axios from 'axios';

const EventForm = ({ users }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedUser = users.find(user => user.id === parseInt(userId));

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/events/', {
        title,
        description,
        start_time: startTime,
        end_time: endTime,
        user: selectedUser ? selectedUser.id : null
      });

      if (response.status === 201) {
        setSuccess('Event added successfully');
        setTitle('');
        setDescription('');
        setStartTime('');
        setEndTime('');
        setUserId('');
        setError(null);
      }
    } catch (error) {
      setError('Failed to add event');
      setSuccess(null);
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          placeholder="Event Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          placeholder="Event Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Start Time</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div>
        <label>End Time</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <div>
        <label>Instructor Assigned</label>
        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {`${user.first_name} ${user.last_name}`}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add Event</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default EventForm;