import React, { useState, useEffect } from 'react';
import EventForm from './EventForm';
import EventList from './EventList';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch users with role 'instructor' from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/');
        // Filter users to include only those with the role 'instructor'
        const instructors = response.data.filter(user => user.role === "instructor");
        setUsers(instructors);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  return (
    <>
      <EventForm addEvent={addEvent} users={users} />
      <EventList events={events} />
    </>
  );
};

export default Event;
