import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewLectures = () => {
  const [lectures, setLectures] = useState([]);
  const [modules, setModules] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [error, setError] = useState(null);
  const [userID, setUserID] = useState('');
  const [userRole, setUserRole] = useState('');
  const [batch, setBatch] = useState('');
  const [faculty, setFaculty] = useState('');

  useEffect(() => {
    // Retrieve user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    if (userInfo) {
      setUserID(userInfo.id);
      setUserRole(userInfo.role);
      setBatch(userInfo.batch);
      setFaculty(userInfo.faculty);
    }

    const fetchData = async () => {
      try {
        // Fetch all necessary data
        const [lecturesResponse, modulesResponse, instructorsResponse, classroomsResponse, batchResponse, facultyResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/lectures/'),
          axios.get('http://127.0.0.1:8000/api/modules/'),
          axios.get('http://127.0.0.1:8000/api/users/'),
          axios.get('http://127.0.0.1:8000/api/classrooms/'),
          axios.get('http://127.0.0.1:8000/api/batches/'),
          axios.get('http://127.0.0.1:8000/api/faculties/'),
        ]);
        // Create mappings from IDs to names
        const modulesMap = new Map(modulesResponse.data.map((module) => [module.id, module.module_name]));
        const instructorsMap = new Map(instructorsResponse.data.map((instructor) => [instructor.id, instructor.first_name, instructor.last_name]));
        const classroomsMap = new Map(classroomsResponse.data.map((classroom) => [classroom.id, classroom.room_name]));
        
        const facultyMap = new Map(facultyResponse.data.map((faculty) => [faculty.id, faculty.name]));
        const batchMap = new Map(batchResponse.data.map((batch) => [batch.id, batch.year]));

        // Filter lectures based on user role and additional filters
        const filteredLectures = userRole === 'admin'
          ? lecturesResponse.data
          : lecturesResponse.data.filter((lecture) => (lecture.batch === batch && lecture.faculty === faculty));

        console.log(filteredLectures)

        // Update lectures data with names
        const lecturesWithNames = filteredLectures.map((lecture) => ({
          ...lecture,
          module_name: modulesMap.get(lecture.module) || 'N/A',
          instructor_name: instructorsMap.get(lecture.user) || 'N/A',
          classroom_name: classroomsMap.get(lecture.classroom) || 'N/A',
          batch_year: batchMap.get(lecture.batch) || 'N/A',
          faculty_name: facultyMap.get(parseInt(lecture.faculty)) || 'N/A',
        }));
        console.log(lecturesWithNames)
        setLectures(lecturesWithNames);
      } catch (error) {
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, [userID, userRole, batch, faculty]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  };  

  return (
    <div className="view-lectures-container">
      {error && <p className="error-message">{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Module Name</th>
            <th>Instructor</th>
            <th>Classroom</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Day of Week</th>
            {/* Conditionally render columns based on user role */}
            {userRole === 'admin' && (
              <>
                <th>Batch</th>
                <th>Faculty</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {lectures.map((lecture) => (
            <tr key={lecture.id}>
              <td>{lecture.module_name}</td>
              <td>{lecture.instructor_name}</td>
              <td>{lecture.classroom_name}</td>
              <td>{formatDate(lecture.start_time)}</td>
              <td>{formatDate(lecture.end_time)}</td>
              <td>{lecture.day_of_week}</td>
              {/* Conditionally render data based on user role */}
              {userRole !== 'instructor' && userRole !== 'student' && (
                <>
                  <td>{lecture.batch_year || 'N/A'}</td>
                  <td>{lecture.faculty_name || 'N/A'}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewLectures;