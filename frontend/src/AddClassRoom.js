import React, { useState } from 'react';
import axios from 'axios';

const AddClassRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [availability, setAvailability] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/classrooms/', {
        room_name: roomName,
        capacity: parseInt(capacity),
        availability: availability,
      });

      if (response.status === 201) {
        setSuccess('Classroom added successfully');
        setRoomName('');
        setCapacity('');
        setAvailability(false);
        setError(null);
      }
    } catch (error) {
      setError('Failed to add classroom');
      setSuccess(null);
    }
  };

  return (
    <form className="classroom-form" onSubmit={handleSubmit}>
      <div>
        <label>Room Name</label>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </div>
      <div>
        <label>Capacity</label>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
      </div>
      <div>
        <label>Availability</label>
        <input
          type="checkbox"
          checked={availability}
          onChange={(e) => setAvailability(e.target.checked)}
        />
      </div>
      <button type="submit">Add Classroom</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default AddClassRoom;