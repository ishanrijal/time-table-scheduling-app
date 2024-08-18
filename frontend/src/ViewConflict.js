import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewConflicts = () => {
  const [conflicts, setConflicts] = useState([]);
  const [userID, setUserID] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve user info from localStorage and store it in state
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    if (userInfo) {
      setUserID(userInfo.id);
      setUserRole(userInfo.role);
    }

    // Fetch conflicts based on user role
    const fetchConflicts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/conflicts/');
        const allConflicts = response.data;

        // Filter conflicts based on user role
        if (userInfo.role === 'admin') {
          setConflicts(allConflicts);
        } else {
          const userConflicts = allConflicts.filter(conflict => conflict.user === userInfo.id);
          setConflicts(userConflicts);
        }
      } catch (error) {
        setError('Failed to fetch conflicts');
      }
    };

    fetchConflicts();
  }, []);

  const handleStatusChange = async (conflict) => {
    const newStatus = conflict.resolution_status === 'resolved' ? 'pending' : 'resolved';
    
    // Optimistically update the UI
    setConflicts((prevConflicts) =>
      prevConflicts.map((item) =>
        item.id === conflict.id
          ? { ...item, resolution_status: newStatus }
          : item
      )
    );
    
    try {
      // Update the status on the server
      await axios.put(`http://127.0.0.1:8000/api/conflicts/${conflict.id}/`, {
        conflict_type: conflict.conflict_type,
        details: conflict.details,
        resolution_status: newStatus,
      });
    } catch (error) {
      setError('Failed to update conflict status');
      // Rollback UI change in case of error
      setConflicts((prevConflicts) =>
        prevConflicts.map((item) =>
          item.id === conflict.id
            ? { ...item, resolution_status: conflict.resolution_status }
            : item
        )
      );
    }
  };

  return (
    <div className="view-conflicts-container">
      {error && <p className="error-message">{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Conflict Type</th>
            <th>Details</th>
            <th>Resolution Status</th>
            {/* Show the toggle column only if userRole is 'admin' */}
            {userRole === 'admin' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {conflicts.map((conflict) => (
            <tr key={conflict.id}>
              <td>{conflict.conflict_type}</td>
              <td>{conflict.details}</td>
              <td>{conflict.resolution_status || 'Not Set'}</td>
              {/* Show the toggle only if userRole is 'admin' */}
              {userRole === 'admin' && (
                <td>
                  <div className="toggle-switch">
                    <label>
                      <input
                        type="checkbox"
                        checked={conflict.resolution_status === 'resolved'}
                        onChange={() => handleStatusChange(conflict)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewConflicts;
