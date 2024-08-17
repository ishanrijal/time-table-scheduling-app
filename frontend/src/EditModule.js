import React, { useState } from 'react';
import axios from 'axios';

const EditModule = ({ moduleId, module_code, module_name, credit_hours, instructor, room, time_slot, mode_of_delivery, onClose }) => {
  const [editedModule, setEditedModule] = useState({
    module_code,
    module_name,
    credit_hours,
    instructor,
    room,
    time_slot,
    mode_of_delivery,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedModule(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/modules/${moduleId}/`, editedModule);
      onClose(); // Close the edit form
    } catch (error) {
      setError('Failed to update module');
    }
  };

  return (
    <div className="edit-module-container">
      <h2>Edit Module</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="event-form" onSubmit={handleSubmit}>
        <label>
          Module Code:
          <input type="text" name="module_code" value={editedModule.module_code} onChange={handleChange} />
        </label>
        <label>
          Module Name:
          <input type="text" name="module_name" value={editedModule.module_name} onChange={handleChange} />
        </label>
        <label>
          Credit Hours:
          <input type="number" name="credit_hours" value={editedModule.credit_hours} onChange={handleChange} />
        </label>
        <label>
          Instructor:
          <input type="text" name="instructor" value={editedModule.instructor} onChange={handleChange} />
        </label>
        <label>
          Room:
          <input type="text" name="room" value={editedModule.room} onChange={handleChange} />
        </label>
        <label>
          Time Slot:
          <input type="text" name="time_slot" value={editedModule.time_slot} onChange={handleChange} />
        </label>
        <label>
          Mode of Delivery:
          <input type="text" name="mode_of_delivery" value={editedModule.mode_of_delivery} onChange={handleChange} />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditModule;