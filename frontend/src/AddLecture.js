import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddLecture = () => {
  const [modules, setModules] = useState([]); // List of modules fetched from the API
  const [classrooms, setClassrooms] = useState([]); // List of classrooms fetched from the API
  const [module, setModule] = useState(''); // Selected module ID
  const [classroom, setClassroom] = useState(''); // Selected classroom ID
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [batch, setBatch] = useState('');
  const [faculty, setFaculty] = useState('');
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [batches, setBatches] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Function to fetch data from the API
  const getData = async () => {
    try {
      const urls = [
        'http://127.0.0.1:8000/api/classrooms/',
        'http://127.0.0.1:8000/api/users/',
        'http://127.0.0.1:8000/api/modules/',
        'http://127.0.0.1:8000/api/batches/',
        'http://127.0.0.1:8000/api/faculties/'
      ];

      const [classroomResponse, userResponse, moduleResponse, batchResponse, facultyResponse] = await Promise.all(
        urls.map(url => axios.get(url))
      );

      setClassrooms(classroomResponse.data);
      setUsers(userResponse.data);
      setModules(moduleResponse.data);
      setBatches(batchResponse.data);
      setFaculties(facultyResponse.data);

      // Extract teachers from users with role 'instructor'
      const teacherUsers = userResponse.data.filter(user => user.role === 'instructor');
      setTeachers(teacherUsers);

    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/lectures/', {
        module: parseInt(module),       // Ensure the selected module ID is sent as an integer
        classroom: parseInt(classroom), // Ensure the selected classroom ID is sent as an integer
        start_time: startTime,          // The start time in the correct ISO format
        end_time: endTime,              // The end time in the correct ISO format
        day_of_week: dayOfWeek,         // The day of the week as a string
        batch: batch ? batch : null,    // Set batch to null if empty
        faculty: faculty || "",         // Set faculty to an empty string if not selected
        user: parseInt(userId),
      });

      if (response.status === 201) {
        setSuccess('Lecture added successfully');
        setModule(''); // Resetting the selected module
        setClassroom(''); // Resetting the selected classroom
        setStartTime('');
        setEndTime('');
        setDayOfWeek('');
        setBatch('');
        setFaculty('');
        setUserId(null);
        setError(null);
      }
    } catch (error) {
      setError('Failed to add lecture');
      setSuccess(null);
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h1>Add Schedule</h1>
      <div>
        <label>Module</label>
        <select value={module} onChange={(e) => setModule(e.target.value)}>
          <option value="">Select Module</option>
          {modules?.map((module) => (
            <option key={module.id} value={module.id}>
              {module.module_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Classroom</label>
        <select value={classroom} onChange={(e) => setClassroom(e.target.value)}>
          <option value="">Select Classroom</option>
          {classrooms?.map((room) => (
            <option key={room.id} value={room.id}>
              {room.room_name}
            </option>
          ))}
        </select>
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
        <label>Day of Week</label>
        <input
          type="text"
          value={dayOfWeek}
          onChange={(e) => setDayOfWeek(e.target.value)}
        />
      </div>
      <div>
        <label>Batch</label>
        <select value={batch} onChange={(e) => setBatch(e.target.value)}>
          <option value="">Select Batch</option>
          {batches?.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {batch.year}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Faculty</label>
        <select value={faculty} onChange={(e) => setFaculty(e.target.value)}>
          <option value="">Select Faculty</option>
          {faculties?.map((fac) => (
            <option key={fac.id} value={fac.id}>
              {fac.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Instructor Assigned</label>
        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="">Select Instructor</option>
          {teachers.map((user) => (
            <option key={user.id} value={user.id}>
              {`${user.first_name} ${user.last_name}`}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add Lecture</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default AddLecture;
