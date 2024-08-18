import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    role: ''
  });

  useEffect(() => {
    // Retrieve user-info from localStorage
    const userInfoString = localStorage.getItem('user-info');
    if (userInfoString) {
      try {
        const userInfoObject = JSON.parse(userInfoString);
        setUserInfo({
          email: userInfoObject.email,
          firstName: userInfoObject.first_name,
          lastName: userInfoObject.last_name,
          role: userInfoObject.role
        });
      } catch (error) {
        console.error('Error parsing user-info:', error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  return (
    <div className="profile">
      <h1>User Profile</h1>
      <form className='event-form'>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleChange}
            style={{textTransform: 'capitalize'}}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userInfo.lastName}
            onChange={handleChange}
            style={{textTransform: 'capitalize'}}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={userInfo.role}
            onChange={handleChange}
            style={{textTransform: 'capitalize'}}
            disabled
          />
        </div>
      </form>
    </div>
  );
};

export default Profile;