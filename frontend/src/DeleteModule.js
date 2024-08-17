import React from 'react';
import axios from 'axios';
import deleteRecords from './services/handleDeleteRequest';

const DeleteModule = ({ moduleId }) => {
  const handleDelete = async () => {
    try {
      await deleteRecords('modules', moduleId);
      alert('Modules deleted successfully');
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete module', error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteModule;