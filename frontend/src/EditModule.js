import React, { useState, useEffect } from 'react';
import axios from 'axios';

const modeOfDeliveryOptions = [
  { value: 'online', name: 'Online' },
  { value: 'physical', name: 'Physical' }
];

const EditModule = ({ moduleId, module_code, module_name, credit_hours, instructor, room, time_slot, mode_of_delivery, onClose }) => {
  const [moduleCode, setModuleCode] = useState(module_code);
  const [moduleName, setModuleName] = useState(module_name);
  const [creditHours, setCreditHours] = useState(credit_hours);
  const [selectedInstructor, setSelectedInstructor] = useState(instructor);
  const [selectedRoom, setSelectedRoom] = useState(room);
  const [timeSlot, setTimeSlot] = useState(time_slot);
  const [selectedModeOfDelivery, setSelectedModeOfDelivery] = useState(mode_of_delivery);
  const [instructors, setInstructors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/');
        setInstructors(response.data.filter(user => user.role === 'instructor'));
      } catch (error) {
        setError('Failed to fetch instructors');
      }
    };

    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/classrooms/');
        setRooms(response.data);
      } catch (error) {
        setError('Failed to fetch rooms');
      }
    };

    fetchInstructors();
    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/modules/${moduleId}/`, {
        module_code: moduleCode,
        module_name: moduleName,
        credit_hours: creditHours,
        instructor: selectedInstructor,
        room: selectedRoom,
        time_slot: timeSlot,
        mode_of_delivery: selectedModeOfDelivery,
      });

      if (response.status === 200) {
        onClose(); // Notify parent component of successful update
      }
    } catch (error) {
      setError('Failed to update module');
    }
  };

  const getInstructorName = (id) => {
    const instructor = instructors.find(user => user.id === id);
    return instructor ? `${instructor.first_name} ${instructor.last_name}` : 'Unknown';
  };

  const getRoomName = (id) => {
    const room = rooms.find(room => room.id === id);
    return room ? room.room_name : 'Unknown';
  };

  return (
    <div className="edit-module-container">
      <form className='event-form' onSubmit={handleSubmit}>
        <div>
          <label>Module Code</label>
          <input
            type="text"
            value={moduleCode}
            onChange={(e) => setModuleCode(e.target.value)}
          />
        </div>
        <div>
          <label>Module Name</label>
          <input
            type="text"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
          />
        </div>
        <div>
          <label>Credit Hours</label>
          <input
            type="number"
            value={creditHours}
            onChange={(e) => setCreditHours(e.target.value)}
          />
        </div>
        <div>
          <label>Instructor</label>
          <select
            value={selectedInstructor}
            onChange={(e) => setSelectedInstructor(e.target.value)}
          >
            <option value="">Select Instructor</option>
            {instructors.map((instructor) => (
              <option key={instructor.id} value={instructor.id}>
                {`${instructor.first_name} ${instructor.last_name}`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Room</label>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            <option value="">Select Room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.room_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Time Slot</label>
          <input
            type="text"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          />
        </div>
        <div>
          <label>Mode of Delivery</label>
          <select
            value={selectedModeOfDelivery}
            onChange={(e) => setSelectedModeOfDelivery(e.target.value)}
          >
            {modeOfDeliveryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Update Module</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EditModule;