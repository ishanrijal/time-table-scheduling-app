import React from 'react';
import userPhoto from './assets/icon/user.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/dashboard/user-profile'); 
  };

  return (
    <div className="header">
      <div className="logo">Time Scheduling App</div>
      <div className="user-profile">
        <img
          src={userPhoto}
          alt="User"
          onClick={handleProfileClick} // Call the function directly
          style={{ cursor: 'pointer' }} // Add pointer cursor to indicate it's clickable
        />
      </div>
    </div>
  );
};

export default Header;