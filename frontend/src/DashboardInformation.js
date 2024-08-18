import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardInformation = () => {
  const [events, setEvents] = useState([]);

  return (
    <div className="dashboard-container">
        <h1>Welcome to the Dashboard...</h1>
    </div>
  );
};

export default DashboardInformation;