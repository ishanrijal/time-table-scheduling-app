import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditClassRoom = ({ classroomId, room_name, capacity, availability, onClose }) => {
  const [roomID, setRoomID] = useState(classroomId);
  const [name, setName] = useState(room_name);
  const [cap, setCap] = useState(capacity);
  const [avail, setAvail] = useState(availability);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have the classroom ID to update
      const response = await axios.put(`http://127.0.0.1:8000/api/classrooms/${roomID}/`, {
        room_name: name,
        capacity: cap,
        availability: avail
      });

      if (response.status === 200) {
        setSuccess('Classroom updated successfully');
        onClose(); // Close the edit form after successful update
      }
    } catch (error) {
      setError('Failed to update classroom');
      setSuccess(null);
    }
  };

  return (
    <div className="edit-classroom-container">
      <h2>Edit Classroom</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form className="event-form" onSubmit={handleSubmit}>
        <div>
          <label>Room Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Capacity</label>
          <input
            type="number"
            value={cap}
            onChange={(e) => setCap(e.target.value)}
          />
        </div>
        <div>
          <label>Availability</label>
          <input
            type="checkbox"
            checked={avail}
            onChange={(e) => setAvail(e.target.checked)}
          />
        </div>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditClassRoom;