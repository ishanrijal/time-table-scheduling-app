import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddModule = () => {
  const [moduleCode, setModuleCode] = useState('');
  const [moduleName, setModuleName] = useState('');
  const [creditHours, setCreditHours] = useState('');
  const [instructor, setInstructor] = useState('');
  const [room, setRoom] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [modeOfDelivery, setModeOfDelivery] = useState('');
  const [instructors, setInstructors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Function to fetch data from the API based on the provided slug
  const getData = async (slug) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/${slug}/`);
      return response.data;
    } catch (error) {
      setError(`Failed to fetch ${slug}`);
      return [];
    }
  };

  // Fetch instructors and rooms on component mount
  useEffect(() => {
    const fetchData = async () => {
      const fetchedInstructors = await getData('users');  // Assuming 'users' endpoint returns user data with role
      const fetchedRooms = await getData('classrooms');  // Assuming 'classrooms' endpoint returns room data
      
      // Filter instructors with role 'instructor' and map to options
      setInstructors(fetchedInstructors.filter(user => user.role === 'instructor'));

      // Map rooms to options
      setRooms(fetchedRooms);
    };
    
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/modules/', {
        module_code: moduleCode,
        module_name: moduleName,
        credit_hours: parseInt(creditHours),
        instructor: instructor,
        room: room,
        time_slot: timeSlot,
        mode_of_delivery: modeOfDelivery,
      });

      if (response.status === 201) {
        setSuccess('Module added successfully');
        setModuleCode('');
        setModuleName('');
        setCreditHours('');
        setInstructor('');
        setRoom('');
        setTimeSlot('');
        setModeOfDelivery('');
        setError(null);
      }
    } catch (error) {
      setError('Failed to add module');
      setSuccess(null);
    }
  };

  const mode_of_delivery = ()=>[
                    {
                        "value": "online",
                        "name": "Online"
                    },
                    {
                        "value": "physical",
                        "name": "Physical"
                    }
                ]

  return (
    <form className="event-form" onSubmit={handleSubmit}>
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
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
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
          value={room}
          onChange={(e) => setRoom(e.target.value)}
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
          type="datetime-local"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
        />
      </div>
      <div>
        <label>Mode of Delivery</label>
        <select
          value={modeOfDelivery}
          onChange={(e) => setModeOfDelivery(e.target.value)}
        >
          <option value="">Select Mode</option>
          {mode_of_delivery().map((mod) => (
            <option key={mod.value} value={mod.value}>
              {mod.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add Module</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default AddModule;