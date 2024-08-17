import React from 'react';
import axios from 'axios';
import deleteRecords from './services/handleDeleteRequest';

const DeleteClassRoom = ({ classroomId }) => {
  const handleDelete = async () => {
    try {
      await deleteRecords('classrooms', classroomId);
      alert('Classroom deleted successfully');
    } catch (error) {
      alert('Failed to delete classroom');
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteClassRoom;