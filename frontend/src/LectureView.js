import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LectureForm = () => {
  const [modules, setModules] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
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
        'http://127.0.0.1:8000/api/modules/'
      ];

      const [classroomResponse, userResponse, moduleResponse] = await Promise.all(
        urls.map(url => axios.get(url))
      );

      setClassrooms(classroomResponse.data);
      setUsers(userResponse.data);
      setModules(moduleResponse.data);

      // Extract unique batches and faculties from users with role 'student'
      const studentUsers = userResponse.data.filter(user => user.role === 'student');
      const uniqueBatches = Array.from(new Set(studentUsers.map(user => user.batch))).filter(batch => batch !== null);
      setBatches(uniqueBatches);

      const uniqueFaculties = Array.from(new Set(studentUsers.map(user => user.faculty))).filter(faculty => faculty !== null);
      setFaculties(uniqueFaculties);

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
        module: module,
        classroom: classrooms,
        start_time: startTime,
        end_time: endTime,
        day_of_week: dayOfWeek,
        batch: batch,
        faculty: faculty,
        user: userId,
      });

      if (response.status === 201) {
        setSuccess('Lecture added successfully');
        setModules('');
        setClassrooms('');
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
      <div>
        <label>Module</label>
        <select value={module} onChange={(e) => setModules(e.target.value)}>
          <option value="">Select Module</option>
          {modules.map((mod) => (
            <option key={mod.id} value={mod.id}>
              {mod.module_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Classroom</label>
        <select value={classrooms} onChange={(e) => setClassrooms(e.target.value)}>
          <option value="">Select Classroom</option>
          {classrooms.map((room) => (
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
          {batches.map((batch) => (
            <option key={batch} value={batch}>
              {batch}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Faculty</label>
        <select value={faculty} onChange={(e) => setFaculty(e.target.value)}>
          <option value="">Select Faculty</option>
          {faculties.map((fac) => (
            <option key={fac} value={fac}>
              {fac}
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

export default LectureForm;