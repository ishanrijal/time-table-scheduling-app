import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard/" activeClassName="active">Dashboard</Link>
        </li>
        <li>
          <Link to="/dashboard/add-event" activeClassName="active">Add Event</Link>
        </li>
        <li>
          <Link to="/dashboard/view-events" activeClassName="active">View Events</Link>
        </li>
        <li>
          <Link to="/dashboard/user-profile" activeClassName="active">User Profile</Link>
        </li>
        <li>
          <Link to="/dashboard/calendar" activeClassName="active">Calendar</Link>
        </li>
        <li>
          <Link to="/dashboard/add-lecture" activeClassName="active">Add Lectures</Link>
        </li>
        <li>
          <Link to="/dashboard/view-classrooms" activeClassName="active">Manage Classrooms</Link>
        </li>
        <li>
          <Link to="/dashboard/add-classrooms" activeClassName="active">Add Classrooms</Link>
        </li>
        <li>
          <Link to="/dashboard/view-modules" activeClassName="active">Manage modules</Link>
        </li>
        <li>
          <Link to="/dashboard/add-modules" activeClassName="active">Add Modules</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;