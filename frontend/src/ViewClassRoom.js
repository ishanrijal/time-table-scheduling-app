import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteClassRoom from './DeleteClassRoom';
import EditClassRoom from './EditClassRoom';

const ViewClassRoom = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [error, setError] = useState(null);
  const [editingClassroom, setEditingClassroom] = useState(null);

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
  }, [editingClassroom]);

  const handleEditClick = (classroom) => {
    setEditingClassroom(classroom);
  };

  const handleCloseEdit = () => {
    setEditingClassroom(null);
  };

  return (
    <div className="view-classroom-container">
      {error && <p className="error-message">{error}</p>}
      {editingClassroom && (
        <EditClassRoom
          classroomId={editingClassroom.id}
          room_name={editingClassroom.room_name}
          capacity={editingClassroom.capacity}
          availability={editingClassroom.availability}
          onClose={handleCloseEdit}
        />
      )}
      {!editingClassroom && (
        <table className="table">
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
                  <button className="button button-edit" onClick={() => handleEditClick(classroom)}>Edit</button>
                  <DeleteClassRoom classroomId={classroom.id} className="button button-delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewClassRoom;