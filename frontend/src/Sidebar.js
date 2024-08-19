import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="dashboard-sidebar">
      <ul>
        <li>
          <Link to="/dashboard/" activeClassName="active">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/dashboard/add-event" activeClassName="active">
            Add Event
          </Link>
        </li>
        <li>
          <Link to="/dashboard/view-events" activeClassName="active">
            View Events
          </Link>
        </li>
        <li>
          <Link to="/dashboard/user-profile" activeClassName="active">
            User Profile
          </Link>
        </li>
        <li>
          <Link to="/dashboard/calendar" activeClassName="active">
            Calendar
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
