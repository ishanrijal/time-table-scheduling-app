import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user-info from localStorage
    const userInfoString = localStorage.getItem('user-info');
    if (userInfoString) {
      try {
        const userInfoObject = JSON.parse(userInfoString);
        setUserRole(userInfoObject.role);
      } catch (error) {
        console.error('Error parsing user-info:', error);
      }
    }
  }, []);

  const handleLogout = (e) =>{
    e.preventDefault();
    localStorage.removeItem('user-info')
    localStorage.removeItem('token');
    navigate('/'); 
  }

  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink
            to="/dashboard/information"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Dashboard
          </NavLink>
        </li>
        {userRole === 'admin' && (
          <>
            <li>
              <NavLink
                to="/dashboard/view-classrooms"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Manage Classrooms
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/add-classrooms"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Add Classrooms
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/view-modules"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Manage Modules
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/add-modules"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Add Modules
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/add-lecture"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Add Lectures
              </NavLink>
            </li>
          </>
        )}
          <li>
          <NavLink
            to="/dashboard/view-lecture"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            View Lectures
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/view-conflicts"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            View Conflicts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/add-conflicts"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Add Conflict
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/calendar"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Calendar
          </NavLink>
        </li>
      </ul>
      <div className="logout-container">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;