import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [events, setEvents] = useState([]);

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