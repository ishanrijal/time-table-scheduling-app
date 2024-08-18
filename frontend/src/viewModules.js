import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteModule from './DeleteModule'; // Assume this is a component you create for module deletion
import EditModule from './EditModule'; // Component for editing modules

const modeOfDeliveryOptions = [
  { value: 'online', name: 'Online' },
  { value: 'physical', name: 'Physical' }
];

const ViewModules = () => {
  const [modules, setModules] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [editingModule, setEditingModule] = useState(null);

  // Function to fetch data from the API based on the provided slug
  const fetchData = async (slug) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/${slug}/`);
      return response.data;
    } catch (error) {
      setError(`Failed to fetch ${slug}`);
      return [];
    }
  };

  // Fetch modules, instructors, and rooms on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [modulesData, instructorsData, roomsData] = await Promise.all([
          fetchData('modules'),
          fetchData('users'),
          fetchData('classrooms')
        ]);

        setModules(modulesData);
        setInstructors(instructorsData.filter(user => user.role === 'instructor'));
        setRooms(roomsData);
      } catch (error) {
        setError('Failed to fetch data');
      }
    };

    fetchAllData();
  }, [editingModule]);

  // Function to get the instructor's name by ID
  const getInstructorName = (id) => {
    const instructor = instructors.find(user => user.id === id);
    return instructor ? `${instructor.first_name} ${instructor.last_name}` : 'Unknown';
  };

  // Function to get the room name by ID
  const getRoomName = (id) => {
    const room = rooms.find(room => room.id === id);
    return room ? room.room_name : 'Unknown';
  };

  // Function to get the mode of delivery name by value
  const getModeOfDeliveryName = (value) => {
    const option = modeOfDeliveryOptions.find(option => option.value === value);
    return option ? option.name : 'Unknown';
  };

  const handleEditClick = (module) => {
    setEditingModule(module);
  };

  const handleCloseEdit = () => {
    setEditingModule(null);
  };

  return (
    <div className="view-module-container">
      {error && <p className="error-message">{error}</p>}
      {editingModule && (
        <EditModule
          moduleId={editingModule.id}
          module_code={editingModule.module_code}
          module_name={editingModule.module_name}
          credit_hours={editingModule.credit_hours}
          instructor={editingModule.instructor}
          room={editingModule.room}
          time_slot={editingModule.time_slot}
          mode_of_delivery={editingModule.mode_of_delivery}
          onClose={handleCloseEdit}
        />
      )}
      {!editingModule && (
        <table className="table">
          <thead>
            <tr>
              <th>Module Code</th>
              <th>Module Name</th>
              <th>Credit Hours</th>
              <th>Instructor</th>
              <th>Room</th>
              <th>Time Slot</th>
              <th>Mode of Delivery</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module) => (
              <tr key={module.id}>
                <td>{module.module_code}</td>
                <td>{module.module_name}</td>
                <td>{module.credit_hours}</td>
                <td>{getInstructorName(module.instructor)}</td>
                <td>{getRoomName(module.room)}</td>
                <td>{module.time_slot}</td>
                <td>{getModeOfDeliveryName(module.mode_of_delivery)}</td>
                <td>
                  <button className="button button-edit" onClick={() => handleEditClick(module)}>Edit</button>
                  <DeleteModule moduleId={module.id} className="button button-delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewModules;