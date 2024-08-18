import React, { useState } from 'react';
import axios from 'axios';

const AddConflict = () => {
  const [conflictType, setConflictType] = useState('');
  const [details, setDetails] = useState('');
  const [resolutionStatus, setResolutionStatus] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve user-info from localStorage
      const userInfo = JSON.parse(localStorage.getItem('user-info'));

      if (!userInfo || !userInfo.id) {
        setError('User information is missing. Please log in.');
        return;
      }

      const response = await axios.post('http://127.0.0.1:8000/api/conflicts/', {
        conflict_type: conflictType,
        details: details,
        resolution_status: 'pending',
        user: userInfo.id, // Pass the user ID to the API
      });

      if (response.status === 201) {
        setSuccess('Conflict added successfully');
        setConflictType('');
        setDetails('');
        setResolutionStatus(null);
        setError(null);
      }
    } catch (error) {
      setError('Failed to add conflict');
      setSuccess(null);
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div>
        <label>Conflict Type</label>
        <select
          value={conflictType}
          onChange={(e) => setConflictType(e.target.value)}
        >
          <option value="">Select Conflict Type</option>
          <option value="schedule">Schedule Conflict</option>
          <option value="resource">Resource Conflict</option>
        </select>
      </div>
      <div>
        <label>Details</label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>
      <button type="submit">Add Conflict</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default AddConflict;
