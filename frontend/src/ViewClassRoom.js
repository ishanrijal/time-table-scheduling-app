import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteClassRoom from './DeleteClassRoom';

const ViewClassRoom = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/classrooms/');
        setClassrooms(response.data);
      } catch (error) {
        setError('Failed to fetch classrooms');
      }
    };
    fetchClassrooms();
  }, []);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Capacity</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map((classroom) => (
            <tr key={classroom.id}>
              <td>{classroom.room_name}</td>
              <td>{classroom.capacity}</td>
              <td>{classroom.availability ? 'Available' : 'Not Available'}</td>
              <td>
                <button>Edit</button>
                <DeleteClassRoom classroomId={classroom.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewClassRoom;