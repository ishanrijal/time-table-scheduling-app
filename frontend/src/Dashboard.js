import React, { useState } from 'react';
import EventForm from './EventForm';
import EventList from './EventList';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  // Static array of users
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <Sidebar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;